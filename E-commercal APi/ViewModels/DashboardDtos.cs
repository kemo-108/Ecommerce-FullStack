namespace E_commercal_APi.ViewModels
{
    public class DashboardStatsDto
    {
        public decimal TotalRevenue { get; set; }
        public int TotalOrders { get; set; }
        public int TotalProducts { get; set; }
        public int TotalCustomers { get; set; }
        public List<MonthlyRevenueDto> RevenueByMonth { get; set; } = new();
        public List<StatusCountDto> OrderStatusBreakdown { get; set; } = new();
        public List<TopProductDto> TopProducts { get; set; } = new();
        public List<RecentOrderDto> RecentOrders { get; set; } = new();
    }

    public class MonthlyRevenueDto
    {
        public string Month { get; set; }
        public decimal Revenue { get; set; }
        public int Orders { get; set; }
    }

    public class StatusCountDto
    {
        public string Status { get; set; }
        public int Count { get; set; }
    }

    public class TopProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public int QuantitySold { get; set; }
        public decimal Revenue { get; set; }
    }

    public class RecentOrderDto
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
