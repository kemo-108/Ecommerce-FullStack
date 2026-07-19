using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _db;

        public ProductService(AppDbContext db)
        {
            _db = db;
        }

        private static ProductDto ToDto(Product p) => new()
        {
            ProductId = p.ProductId,
            ProductName = p.ProductName,
            Brand = p.Brand,
            Code = p.Code,
            Sku = p.Sku,
            Discount = p.Discount ?? 0,
            ImageUrl = p.ImageUrl,
            Price = p.Price,
            OldPrice = p.OldPrice,
            Rating = p.Rating,
            Description = p.Description,
            Category = p.Category?.Name,
            CategoryId = p.CategoryId,
            Qty = p.InventoryRecords?.Sum(i => i.Stock) ?? 0,
            Status = p.Status,
            CreatedAt = p.CreatedAt.ToString("dd MMM yyyy"),
        };

        public async Task<List<ProductDto>> GetAllAsync()
        {
            var products = await _db.Products
                .Include(p => p.Category)
                .Include(p => p.InventoryRecords)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return products.Select(ToDto).ToList();
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .Include(p => p.InventoryRecords)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            return product == null ? null : ToDto(product);
        }

        public async Task<ProductDto> CreateAsync(ProductCreateDto dto, string webRootPath)
        {
            string? imageUrl = null;
            var galleryImages = new List<ProductImage>();

            if (dto.Images != null && dto.Images.Count > 0)
            {
                var uploadsFolder = Path.Combine(webRootPath, "uploads", "products");
                Directory.CreateDirectory(uploadsFolder);

                for (int i = 0; i < dto.Images.Count; i++)
                {
                    var file = dto.Images[i];
                    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var url = $"uploads/products/{fileName}";

                    if (i == 0)
                        imageUrl = url; // first image = thumbnail
                    else
                        galleryImages.Add(new ProductImage { ImageUrl = url, SortOrder = i - 1 });
                }
            }

            var product = new Product
            {
                ProductName = dto.ProductName,
                Brand = dto.Brand,
                CategoryId = dto.CategoryId,
                Code = dto.Code,
                Sku = dto.Sku,
                Price = dto.Price,
                OldPrice = dto.OldPrice,
                Discount = dto.Discount,
                Description = dto.Description,
                ImageUrl = imageUrl,
                Status = "active",
                CreatedAt = DateTime.UtcNow,
            };

            if (galleryImages.Count > 0)
                product.Images = galleryImages;

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            // Seed an inventory record in the default warehouse so Qty shows up immediately.
            var defaultWarehouse = await _db.Warehouses.FirstOrDefaultAsync();
            if (defaultWarehouse != null)
            {
                _db.Inventory.Add(new Inventory
                {
                    ProductId = product.ProductId,
                    WarehouseId = defaultWarehouse.Id,
                    Sku = dto.Sku ?? dto.Code ?? $"SKU-{product.ProductId}",
                    Stock = dto.Qty,
                    MinStock = 5,
                    LastUpdated = DateTime.UtcNow,
                });
                await _db.SaveChangesAsync();
            }

            var created = await GetByIdAsync(product.ProductId);
            return created!;
        }

        public async Task<ProductDto> UpdateAsync(int id, ProductUpdateDto dto, string webRootPath)
        {
            var product = await _db.Products.FindAsync(id)
                ?? throw new KeyNotFoundException("Product not found.");

            product.ProductName = dto.ProductName;
            product.Brand = dto.Brand;
            product.Price = dto.Price;
            product.OldPrice = dto.OldPrice;
            product.Discount = dto.Discount;
            product.Code = dto.Code;
            product.Sku = dto.Sku;
            product.Description = dto.Description;
            product.CategoryId = dto.CategoryId;
            product.UpdatedAt = DateTime.UtcNow;

            if (dto.Image != null)
            {
                var uploadsFolder = Path.Combine(webRootPath, "uploads", "products");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                product.ImageUrl = $"uploads/products/{fileName}";
            }

            // Note: stock/quantity is intentionally not updated here.
            // It's managed exclusively from Admin > Inventory.

            await _db.SaveChangesAsync();

            var updated = await GetByIdAsync(id);
            return updated!;
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _db.Products
                .Include(p => p.CartItems)
                .Include(p => p.WishlistedBy)
                .Include(p => p.OrderItems)
                .Include(p => p.Reviews)
                .FirstOrDefaultAsync(p => p.ProductId == id)
                ?? throw new KeyNotFoundException("Product not found.");

            if (product.OrderItems.Any() || product.Reviews.Any())
                throw new InvalidOperationException(
                    "This product has order or review history and can't be deleted.");

            if (product.CartItems.Any())
                _db.CartItems.RemoveRange(product.CartItems);

            if (product.WishlistedBy.Any())
                _db.Wishlists.RemoveRange(product.WishlistedBy);

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
        }
    }
}
