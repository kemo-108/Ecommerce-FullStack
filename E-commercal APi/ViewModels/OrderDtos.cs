namespace E_commercal_APi.ViewModels
{
    public class OrderItemInputDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

    public class PlaceOrderDto
    {
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string PaymentMethod { get; set; }
        public List<OrderItemInputDto> Items { get; set; } = new();
        public decimal Subtotal { get; set; }
        public decimal Shipping { get; set; }
        public decimal Total { get; set; }
    }

    // Used by Admin > Orders > "Create New Order" (walk-in customers)
    public class AdminCreateOrderDto
    {
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string PaymentStatus { get; set; } = "Pending";
        public string Status { get; set; } = "Pending";
        public List<OrderItemInputDto> Items { get; set; } = new();
        public decimal Total { get; set; }
    }

    public class UpdateOrderStatusDto
    {
        public string Status { get; set; }
    }

    public class OrderDto
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerImage { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Shipping { get; set; }
        public decimal Total { get; set; }
        public string PaymentStatus { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public string Notes { get; set; }
        public string OrderDate { get; set; }
        public List<OrderItemInputDto> Items { get; set; } = new();
    }
}
