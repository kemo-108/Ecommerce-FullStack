namespace E_commercal_APi.ViewModels
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public int Stock { get; set; }   // جديد
    }
    public class CartItemCreateDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; } = 1;
        public string? ColorName { get; set; }
        public string? ColorHexCode { get; set; }
    }

    public class CartItemUpdateDto
    {
        public int Qty { get; set; }
    }
}
