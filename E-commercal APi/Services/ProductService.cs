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

            if (dto.Images != null && dto.Images.Count > 0)
            {
                var uploadsFolder = Path.Combine(webRootPath, "uploads", "products");
                Directory.CreateDirectory(uploadsFolder);

                var file = dto.Images[0];
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                imageUrl = $"uploads/products/{fileName}";
            }

            var category = await _db.Categories
                .FirstOrDefaultAsync(c => c.Name == dto.Category);

            var product = new Product
            {
                ProductName = dto.ProductName,
                Brand = dto.Brand,
                CategoryId = category?.Id,
                Code = dto.Code,
                Price = dto.Price,
                OldPrice = dto.Discount > 0 ? dto.Price / (1 - dto.Discount / 100) : null,
                Description = dto.Description,
                ImageUrl = imageUrl,
                Status = "active",
                CreatedAt = DateTime.UtcNow,
            };

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
                    Sku = dto.Code ?? $"SKU-{product.ProductId}",
                    Stock = dto.Qty,
                    MinStock = 5,
                    LastUpdated = DateTime.UtcNow,
                });
                await _db.SaveChangesAsync();
            }

            var created = await GetByIdAsync(product.ProductId);
            return created!;
        }

        public async Task<ProductDto> UpdateAsync(int id, ProductUpdateDto dto)
        {
            var product = await _db.Products.FindAsync(id)
                ?? throw new KeyNotFoundException("Product not found.");

            product.ProductName = dto.ProductName;
            product.Brand = dto.Brand;
            product.Price = dto.Price;
            product.Description = dto.Description;
            product.UpdatedAt = DateTime.UtcNow;

            if (!string.IsNullOrWhiteSpace(dto.ImageUrl))
                product.ImageUrl = dto.ImageUrl;

            if (!string.IsNullOrWhiteSpace(dto.Category))
            {
                var category = await _db.Categories
                    .FirstOrDefaultAsync(c => c.Name == dto.Category);
                if (category != null) product.CategoryId = category.Id;
            }

            var inventory = await _db.Inventory
                .FirstOrDefaultAsync(i => i.ProductId == id);
            if (inventory != null)
            {
                inventory.Stock = dto.Qty;
                inventory.LastUpdated = DateTime.UtcNow;
            }

            await _db.SaveChangesAsync();

            var updated = await GetByIdAsync(id);
            return updated!;
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _db.Products.FindAsync(id)
                ?? throw new KeyNotFoundException("Product not found.");

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
        }
    }
}
