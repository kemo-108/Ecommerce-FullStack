using E_commercal_APi.Data;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class ReportsService : IReportsService
    {
        private readonly AppDbContext _db;

        public ReportsService(AppDbContext db)
        {
            _db = db;
        }

        // Shared helper: builds the last 6 calendar months, oldest to newest,
        // as (Label, Start, End) windows so every tab buckets consistently.
        private static List<(string Label, DateTime Start, DateTime End)> LastSixMonths()
        {
            var firstOfThisMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
            var start = firstOfThisMonth.AddMonths(-5);

            return Enumerable.Range(0, 6)
                .Select(offset =>
                {
                    var monthStart = start.AddMonths(offset);
                    var monthEnd = monthStart.AddMonths(1);
                    return (monthStart.ToString("MMM"), monthStart, monthEnd);
                })
                .ToList();
        }

        private static decimal PercentChange(decimal current, decimal previous)
        {
            if (previous == 0) return current > 0 ? 100 : 0;
            return Math.Round((current - previous) / previous * 100, 1);
        }

        public async Task<SalesReportDto> GetSalesReportAsync()
        {
            var now = DateTime.UtcNow;
            var thisMonthStart = new DateTime(now.Year, now.Month, 1);
            var lastMonthStart = thisMonthStart.AddMonths(-1);
            var today = now.Date;

            // Pull the raw rows we need once, then do the month-bucketing and
            // aggregation in memory — keeps every LINQ expression below
            // translatable and avoids repeat round-trips per month.
            var sixMonthsAgo = thisMonthStart.AddMonths(-5);
            var orderRows = await _db.Orders
    .Where(o => o.OrderDate >= sixMonthsAgo)
    .Select(o => new { o.OrderDate, o.Total, o.PaymentStatus, o.PaymentMethod })
    .ToListAsync();

            decimal RevenueInRange(DateTime start, DateTime end) => orderRows
                .Where(o => o.PaymentStatus == "paid" && o.OrderDate >= start && o.OrderDate < end)
                .Sum(o => o.Total);

            int OrdersCountInRange(DateTime start, DateTime end) => orderRows
                .Count(o => o.OrderDate >= start && o.OrderDate < end);

            var revenueThisMonth = RevenueInRange(thisMonthStart, thisMonthStart.AddMonths(1));
            var revenueLastMonth = RevenueInRange(lastMonthStart, thisMonthStart);
            var ordersThisMonthCount = OrdersCountInRange(thisMonthStart, thisMonthStart.AddMonths(1));

            var totalOrders = await _db.Orders.CountAsync();
            var newOrdersToday = await _db.Orders.CountAsync(o => o.OrderDate >= today);

            // Profit proxy: paid revenue minus approved refunds for the same
            // window, since the schema has no per-product cost (COGS) field
            // to compute a true margin from.
            var refundRows = await _db.Refunds
                .Where(r => r.Status == "approved" && r.CreatedAt >= sixMonthsAgo)
                .Select(r => new { r.CreatedAt, r.Amount })
                .ToListAsync();

            decimal RefundsInRange(DateTime start, DateTime end) => refundRows
                .Where(r => r.CreatedAt >= start && r.CreatedAt < end)
                .Sum(r => r.Amount);

            var profitThisMonth = revenueThisMonth - RefundsInRange(thisMonthStart, thisMonthStart.AddMonths(1));
            var profitLastMonth = revenueLastMonth - RefundsInRange(lastMonthStart, thisMonthStart);

            var months = LastSixMonths();
            var revenueByMonth = months
                .Select(m => new MonthPointDto { Month = m.Label, Value = RevenueInRange(m.Start, m.End) })
                .ToList();

            var ordersByMonth = months
                .Select(m => new MonthPointDto { Month = m.Label, Value = OrdersCountInRange(m.Start, m.End) })
                .ToList();

            var profitByMonth = months
                .Select(m => new MonthPointDto
                {
                    Month = m.Label,
                    Value = RevenueInRange(m.Start, m.End) - RefundsInRange(m.Start, m.End),
                })
                .ToList();

            var paymentMethods = orderRows
    .GroupBy(o => o.PaymentMethod)
    .Select(g => new NameValueDto { Name = g.Key ?? "Unknown", Value = g.Count() })
    .ToList();

            var topProducts = await _db.OrderItems
                .GroupBy(oi => new { oi.ProductId, oi.ProductName, oi.Product.ImageUrl, CategoryName = oi.Product.Category.Name })
                .Select(g => new ReportProductDto
                {
                    ProductId = g.Key.ProductId,
                    Name = g.Key.ProductName,
                    Image = g.Key.ImageUrl,
                    Category = g.Key.CategoryName ?? "Uncategorized",
                    Sold = g.Sum(oi => oi.Quantity),
                    Revenue = g.Sum(oi => oi.Quantity * oi.Price),
                })
                .OrderByDescending(p => p.Sold)
                .Take(5)
                .ToListAsync();

            return new SalesReportDto
            {
                Revenue = revenueThisMonth,
                RevenueChangePercent = PercentChange(revenueThisMonth, revenueLastMonth),
                TotalOrders = totalOrders,
                NewOrdersToday = newOrdersToday,
                Profit = profitThisMonth,
                ProfitChangePercent = PercentChange(profitThisMonth, profitLastMonth),
                AverageOrderValue = ordersThisMonthCount == 0 ? 0 : Math.Round(revenueThisMonth / ordersThisMonthCount, 2),
                RevenueByMonth = revenueByMonth,
                OrdersByMonth = ordersByMonth,
                PaymentMethods = paymentMethods,
                ProfitByMonth = profitByMonth,
                TopProducts = topProducts,
            };
        }

        public async Task<ProductsReportDto> GetProductsReportAsync()
        {
            var totalProducts = await _db.Products.CountAsync();
            var activeProducts = await _db.Products.CountAsync(p => p.Status == "active");

            // Aggregate stock per product across every warehouse it's stocked in.
            var stockByProduct = await _db.Inventory
                .GroupBy(i => i.ProductId)
                .Select(g => new { ProductId = g.Key, TotalStock = g.Sum(i => i.Stock), TotalMinStock = g.Sum(i => i.MinStock) })
                .ToListAsync();

            var stockedProductIds = stockByProduct.Select(s => s.ProductId).ToHashSet();
            var productIdsWithNoInventoryRow = await _db.Products
                .Where(p => !stockedProductIds.Contains(p.ProductId))
                .CountAsync();

            var outOfStock = stockByProduct.Count(s => s.TotalStock == 0) + productIdsWithNoInventoryRow;
            var lowStock = stockByProduct.Count(s => s.TotalStock > 0 && s.TotalStock <= s.TotalMinStock);

            var itemRows = await _db.OrderItems
                .Select(oi => new
                {
                    oi.ProductId,
                    oi.ProductName,
                    oi.Quantity,
                    oi.Price,
                    ImageUrl = oi.Product.ImageUrl,
                    CategoryName = oi.Product.Category.Name,
                })
                .ToListAsync();

            var perProduct = itemRows
                .GroupBy(i => new { i.ProductId, i.ProductName, i.ImageUrl, i.CategoryName })
                .Select(g => new ReportProductDto
                {
                    ProductId = g.Key.ProductId,
                    Name = g.Key.ProductName,
                    Image = g.Key.ImageUrl,
                    Category = g.Key.CategoryName ?? "Uncategorized",
                    Sold = g.Sum(i => i.Quantity),
                    Revenue = g.Sum(i => i.Quantity * i.Price),
                })
                .ToList();

            var bestSelling = perProduct.OrderByDescending(p => p.Sold).Take(5).ToList();
            var leastSelling = perProduct.OrderBy(p => p.Sold).Take(5).ToList();

            var totalCategoryRevenue = itemRows.Sum(i => i.Quantity * i.Price);
            var categoryGroups = itemRows
                .GroupBy(i => i.CategoryName ?? "Uncategorized")
                .Select(g => new
                {
                    Category = g.Key,
                    UnitsSold = g.Sum(i => i.Quantity),
                    Revenue = g.Sum(i => i.Quantity * i.Price),
                })
                .ToList();

            var categorySales = categoryGroups
                .OrderByDescending(c => c.UnitsSold)
                .Take(5)
                .Select(c => new NameValueDto { Name = c.Category, Value = c.UnitsSold })
                .ToList();

            var categoryDistribution = categoryGroups
                .OrderByDescending(c => c.Revenue)
                .Take(5)
                .Select(c => new NameValueDto
                {
                    Name = c.Category,
                    Value = totalCategoryRevenue == 0 ? 0 : Math.Round(c.Revenue / totalCategoryRevenue * 100, 1),
                })
                .ToList();

            return new ProductsReportDto
            {
                TotalProducts = totalProducts,
                ActiveProducts = activeProducts,
                LowStock = lowStock,
                OutOfStock = outOfStock,
                CategorySales = categorySales,
                CategoryDistribution = categoryDistribution,
                BestSelling = bestSelling,
                LeastSelling = leastSelling,
            };
        }

        public async Task<CustomersReportDto> GetCustomersReportAsync()
        {
            var now = DateTime.UtcNow;
            var thisMonthStart = new DateTime(now.Year, now.Month, 1);
            var ninetyDaysAgo = now.AddDays(-90);

            var totalCustomers = await _db.Users.CountAsync(u => u.Role == "customer");
            var newCustomersThisMonth = await _db.Users
                .CountAsync(u => u.Role == "customer" && u.Joined >= thisMonthStart);

            var orderCountsByUser = await _db.Orders
                .GroupBy(o => o.UserId)
                .Select(g => new { UserId = g.Key, Count = g.Count(), LastOrder = g.Max(o => o.OrderDate) })
                .ToListAsync();

            var returningCustomers = orderCountsByUser.Count(o => o.Count > 1);
            var activeCustomers = orderCountsByUser.Count(o => o.LastOrder >= ninetyDaysAgo);

            var customerTypeSplit = new List<NameValueDto>
            {
                new() { Name = "New", Value = orderCountsByUser.Count(o => o.Count == 1) },
                new() { Name = "Returning", Value = returningCustomers },
            };

            // Cumulative registered-customer count at the end of each of the
            // last 6 months (a running total, not new-per-month).
            var months = LastSixMonths();
            var joinDates = await _db.Users
                .Where(u => u.Role == "customer")
                .Select(u => u.Joined)
                .ToListAsync();

            var customerGrowth = months
                .Select(m => new MonthPointDto
                {
                    Month = m.Label,
                    Value = joinDates.Count(j => j < m.End),
                })
                .ToList();

            var spentByUser = await _db.Orders
                .Where(o => o.PaymentStatus == "paid")
                .GroupBy(o => o.UserId)
                .Select(g => new { UserId = g.Key, Spent = g.Sum(o => o.Total), Orders = g.Count() })
                .OrderByDescending(g => g.Spent)
                .Take(5)
                .ToListAsync();

            var topUserIds = spentByUser.Select(s => s.UserId).ToList();
            var users = await _db.Users
                .Where(u => topUserIds.Contains(u.Id))
                .ToDictionaryAsync(u => u.Id);

            var topCustomers = spentByUser
                .Where(s => users.ContainsKey(s.UserId))
                .Select(s => new ReportCustomerDto
                {
                    UserId = s.UserId,
                    Name = users[s.UserId].Name,
                    Email = users[s.UserId].Email,
                    Image = users[s.UserId].Avatar,
                    Orders = s.Orders,
                    Spent = s.Spent,
                })
                .ToList();

            return new CustomersReportDto
            {
                TotalCustomers = totalCustomers,
                NewCustomersThisMonth = newCustomersThisMonth,
                ReturningCustomers = returningCustomers,
                ActiveCustomers = activeCustomers,
                CustomerGrowth = customerGrowth,
                CustomerTypeSplit = customerTypeSplit,
                TopCustomers = topCustomers,
            };
        }
    }
}