using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.ViewModels
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Brand { get; set; }
        public string Code { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Rating { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int? CategoryId { get; set; }
        public int Qty { get; set; }
        public string Status { get; set; }
        public string CreatedAt { get; set; }
    }

    public class ProductCreateDto
    {
        [Required] public string ProductName { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }
        [Required] public decimal Price { get; set; }
        public decimal Discount { get; set; }
        [Required] public int Qty { get; set; }
        public string Code { get; set; }
        public string Weight { get; set; }
        public string Description { get; set; }
        public List<IFormFile> Images { get; set; }
    }

    public class ProductUpdateDto
    {
        [Required] public string ProductName { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }
        [Required] public decimal Price { get; set; }
        [Required] public int Qty { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
    }

    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool Featured { get; set; }
        public string Status { get; set; }
        public int Products { get; set; }
        public string CreatedAt { get; set; }
        public string CreatedTime { get; set; }
    }

    public class CategoryCreateDto
    {
        [Required] public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool Featured { get; set; }
        public string Status { get; set; } = "Active";
    }
}
