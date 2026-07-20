using E_commercal_APi.Data;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _db;

        public DashboardService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<DashboardStatsDto> GetStatsAsync()
        {
            var totalRevenue = await _db.Orders
                .Where(o => o.PaymentStatus == "paid")
                .SumAsync(o => (decimal?)o.Total) ?? 0;

            var totalOrders = await _db.Orders.CountAsync();
            var totalProducts = await _db.Products.CountAsync();
            var totalCustomers = await _db.Users.CountAsync(u => u.Role == "customer");

            // Revenue for the last 6 months, oldest to newest.
            var sixMonthsAgo = DateTime.UtcNow.AddMonths(-5).Date;
            sixMonthsAgo = new DateTime(sixMonthsAgo.Year, sixMonthsAgo.Month, 1);

            var recentOrdersForRevenue = await _db.Orders
                .Where(o => o.OrderDate >= sixMonthsAgo)
                .Select(o => new { o.OrderDate, o.Total })
                .ToListAsync();

            var revenueByMonth = Enumerable.Range(0, 6)
                .Select(offset => sixMonthsAgo.AddMonths(offset))
                .Select(monthStart =>
                {
                    var monthOrders = recentOrdersForRevenue
                        .Where(o => o.OrderDate.Year == monthStart.Year
                                 && o.OrderDate.Month == monthStart.Month)
                        .ToList();

                    return new MonthlyRevenueDto
                    {
                        Month = monthStart.ToString("MMM yyyy"),
                        Revenue = monthOrders.Sum(o => o.Total),
                        Orders = monthOrders.Count,
                    };
                })
                .ToList();

            var orderStatusBreakdown = await _db.Orders
                .GroupBy(o => o.Status)
                .Select(g => new StatusCountDto { Status = g.Key, Count = g.Count() })
                .ToListAsync();

            var topProducts = await _db.OrderItems
                .GroupBy(oi => new { oi.ProductId, oi.ProductName, oi.Product.ImageUrl })
                .Select(g => new TopProductDto
                {
                    ProductId = g.Key.ProductId,
                    ProductName = g.Key.ProductName,
                    ImageUrl = g.Key.ImageUrl,
                    QuantitySold = g.Sum(oi => oi.Quantity),
                    Revenue = g.Sum(oi => oi.Quantity * oi.Price),
                })
                .OrderByDescending(p => p.QuantitySold)
                .Take(5)
                .ToListAsync();

            var recentOrders = await _db.Orders
                .OrderByDescending(o => o.OrderDate)
                .Take(5)
                .Select(o => new RecentOrderDto
                {
                    OrderId = o.OrderId,
                    CustomerName = o.CustomerName,
                    Total = o.Total,
                    Status = o.Status,
                    OrderDate = o.OrderDate,
                })
                .ToListAsync();

            return new DashboardStatsDto
            {
                TotalRevenue = totalRevenue,
                TotalOrders = totalOrders,
                TotalProducts = totalProducts,
                TotalCustomers = totalCustomers,
                RevenueByMonth = revenueByMonth,
                OrderStatusBreakdown = orderStatusBreakdown,
                TopProducts = topProducts,
                RecentOrders = recentOrders,
            };
        }
    }
}
