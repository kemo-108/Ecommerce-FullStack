namespace E_commercal_APi.ViewModels
{
    // Shared small shapes reused across report tabs.
    public class MonthPointDto
    {
        public string Month { get; set; }
        public decimal Value { get; set; }
    }

    public class NameValueDto
    {
        public string Name { get; set; }
        public decimal Value { get; set; }
    }

    public class ReportProductDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public int Sold { get; set; }
        public decimal Revenue { get; set; }
    }

    // ---------------- Sales tab ----------------
    public class SalesReportDto
    {
        public decimal Revenue { get; set; }
        public decimal RevenueChangePercent { get; set; }
        public int TotalOrders { get; set; }
        public int NewOrdersToday { get; set; }
        public decimal Profit { get; set; }
        public decimal ProfitChangePercent { get; set; }
        public decimal AverageOrderValue { get; set; }
        public List<MonthPointDto> RevenueByMonth { get; set; } = new();
        public List<MonthPointDto> OrdersByMonth { get; set; } = new();
        public List<NameValueDto> PaymentMethods { get; set; } = new();
        public List<MonthPointDto> ProfitByMonth { get; set; } = new();
        public List<ReportProductDto> TopProducts { get; set; } = new();
    }

    // ---------------- Products tab ----------------
    public class ProductsReportDto
    {
        public int TotalProducts { get; set; }
        public int ActiveProducts { get; set; }
        public int LowStock { get; set; }
        public int OutOfStock { get; set; }
        public List<NameValueDto> CategorySales { get; set; } = new();
        public List<NameValueDto> CategoryDistribution { get; set; } = new();
        public List<ReportProductDto> BestSelling { get; set; } = new();
        public List<ReportProductDto> LeastSelling { get; set; } = new();
    }

    // ---------------- Customers tab ----------------
    public class CustomersReportDto
    {
        public int TotalCustomers { get; set; }
        public int NewCustomersThisMonth { get; set; }
        public int ReturningCustomers { get; set; }
        public int ActiveCustomers { get; set; }
        public List<MonthPointDto> CustomerGrowth { get; set; } = new();
        public List<NameValueDto> CustomerTypeSplit { get; set; } = new();
        public List<ReportCustomerDto> TopCustomers { get; set; } = new();
    }

    public class ReportCustomerDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public int Orders { get; set; }
        public decimal Spent { get; set; }
    }
}