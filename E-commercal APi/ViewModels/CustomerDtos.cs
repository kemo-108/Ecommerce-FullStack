namespace E_commercal_APi.ViewModels
{
    // Shape matches Customers.jsx's dummy data exactly, so the existing
    // table/filters/modals work unchanged once wired to the real API.
    public class CustomerListDto
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalSpent { get; set; }
        public string Status { get; set; }   // "Active" | "Blocked"
        public string Type { get; set; }     // "VIP" | "New" | "Regular"
        public string Joined { get; set; }   // "dd MMM yyyy"
    }

    public class CustomerCreateDto
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; } = "Active";
    }

    public class CustomerUpdateDto
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }   // "Active" | "Blocked"
    }
}
