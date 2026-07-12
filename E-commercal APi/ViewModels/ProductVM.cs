namespace E_commercal_APi.ViewModels
{
    public class ProductVM
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public decimal? Rating { get; set; }
        public int Stock { get; set; }
    }
}
