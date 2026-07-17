using Microsoft.AspNetCore.Http;

namespace E_commercal_APi.ViewModels
{
    public class ProductVM
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }

        public decimal Price { get; set; }

        public string? Category { get; set; }

        public int? CategoryId { get; set; }

        public decimal? Rating { get; set; }

        public int Stock { get; set; }

        public decimal? OldPrice { get; set; }

        public decimal? Discount { get; set; }

        public string? Brand { get; set; }

        public string? Code { get; set; }

        public string? Sku { get; set; }

        public string? Description { get; set; }

        public string? Status { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class ProductCreateVM
    {
        public string ProductName { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public decimal? OldPrice { get; set; }

        public decimal? Discount { get; set; }

        public string? Brand { get; set; }

        public string Code { get; set; } = string.Empty;

        public string? Sku { get; set; }

        public string Description { get; set; } = string.Empty;

        public int? CategoryId { get; set; }

        public List<IFormFile> Images { get; set; } = new();
    }

    public class ProductUpdateVM
    {
        public string ProductName { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public decimal? OldPrice { get; set; }

        public decimal? Discount { get; set; }

        public string? Brand { get; set; }

        public string? Code { get; set; }

        public string? Sku { get; set; }

        public string Description { get; set; } = string.Empty;

        public int? CategoryId { get; set; }

        public IFormFile? Image { get; set; }

        public string? Status { get; set; }
    }
}