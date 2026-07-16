using System.ComponentModel.DataAnnotations;

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

       
        public decimal? OldPrice { get; set; }
        public decimal? Discount { get; set; }
        public string? Brand { get; set; }
        public string? Sku { get; set; }
        public string? Code { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class ProductCreateVM
    {
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Discount { get; set; }
        public string? Brand { get; set; }
        public string Code { get; set; }
        public string? Sku { get; set; }
        public string Description { get; set; }
        public int? CategoryId { get; set; }

        public List<IFormFile> Images { get; set; }
    }

    public class ProductUpdateVM
    {
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Discount { get; set; }
        public string? Brand { get; set; }

        public string? Code { get; set; }

        public string? Sku { get; set; }

        public string Description { get; set; }

        public int? CategoryId { get; set; }

        public IFormFile? Image { get; set; }
    }
}
