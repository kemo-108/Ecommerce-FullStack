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
        public List<ProductColorDto> Colors { get; set; } = new();
        public List<ProductSizeDto> Sizes { get; set; } = new();
        // Extra product photos uploaded alongside the main image (Product.Images).
        // These were being saved on create/update but never returned to the
        // storefront, so the gallery thumbnails on the product page had nothing
        // to show beyond the single main image.
        public List<string> GalleryImages { get; set; } = new();
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
        public string Description { get; set; }
        public List<IFormFile> Images { get; set; }
        public List<string>? ColorNames { get; set; }
        public List<string>? ColorHexes { get; set; }
        public List<IFormFile>? ColorImages { get; set; }
        public List<string>? SizeNames { get; set; }
    }

    
        public class ProductUpdateDto
        {
            [Required] public string ProductName { get; set; }
            public string? Category { get; set; }
            public int? CategoryId { get; set; }
            public string? Brand { get; set; }
            public string? Code { get; set; }
            public string? Sku { get; set; }
            [Required] public decimal Price { get; set; }
            public decimal? OldPrice { get; set; }
            public decimal Discount { get; set; }
            // Stock/Qty intentionally isn't here - it's managed exclusively
            // via the Inventory page (see ProductService.UpdateAsync).
            public string? ImageUrl { get; set; }
            // The edit form already sends a new main-image file under this key
            // on update, but there was no field here to catch it, so ASP.NET
            // silently dropped it and "change the product photo" never worked.
            public List<IFormFile>? Images { get; set; }
            public string? Description { get; set; }
            public List<string>? ColorNames { get; set; }
            public List<string>? ColorHexes { get; set; }
            public List<IFormFile>? ColorImages { get; set; }
            public List<string>? ColorExistingImageUrls { get; set; }
        public List<string>? SizeNames { get; set; }
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
        // Kept for backward compatibility (typing a URL directly still works).
        public string Image { get; set; }
        // New: upload a real file instead of pasting a URL, like products do.
        // If both are present, ImageFile wins.
        public IFormFile? ImageFile { get; set; }
        // Explicit "clear the image" signal from the edit form - without this,
        // clicking "remove" in the UI looked like it worked but the old image
        // silently came back on save because nothing told the backend to drop it.
        public bool RemoveImage { get; set; }
        public bool Featured { get; set; }
        public string Status { get; set; } = "Active";
    }
    public class ProductColorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? HexCode { get; set; }
        public string? ImageUrl { get; set; }
    }
    public class ProductSizeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
