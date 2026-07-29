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
            Colors = p.Colors?.Select(c => new ProductColorDto
            {
                Id = c.Id,
                Name = c.Name,
                HexCode = c.HexCode,
                ImageUrl = c.ImageUrl
            }).OrderBy(c => c.Id).ToList() ?? new List<ProductColorDto>(),
        };

        public async Task<(List<ProductDto> Products, int TotalCount)> GetAllAsync(string? search = null, int page = 1, int pageSize = 12)
        {
            var query = _db.Products
                .Include(p => p.Category)
                .Include(p => p.InventoryRecords)
                .Include(p => p.Colors)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim();
                query = query.Where(p =>
                    EF.Functions.Like(p.ProductName, $"%{term}%") ||
                    (p.Brand != null && EF.Functions.Like(p.Brand, $"%{term}%")) ||
                    (p.Code != null && EF.Functions.Like(p.Code, $"%{term}%")) ||
                    (p.Category != null && EF.Functions.Like(p.Category.Name, $"%{term}%")));
            }

            var totalCount = await query.CountAsync();

            var products = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (products.Select(ToDto).ToList(), totalCount);
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .Include(p => p.InventoryRecords)
                .Include(p => p.Colors)
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

            if (galleryImages.Count > 0)
                product.Images = galleryImages;
            var colors = new List<ProductColor>();
            if (dto.ColorNames != null && dto.ColorNames.Count > 0)
            {
                var colorFolder = Path.Combine(webRootPath, "uploads", "products", "colors");
                Directory.CreateDirectory(colorFolder);

                for (int i = 0; i < dto.ColorNames.Count; i++)
                {
                    var colorName = dto.ColorNames[i];
                    if (string.IsNullOrWhiteSpace(colorName)) continue;

                    string? hex = (dto.ColorHexes != null && i < dto.ColorHexes.Count) ? dto.ColorHexes[i] : null;
                    string? colorImageUrl = null;

                    if (dto.ColorImages != null && i < dto.ColorImages.Count && dto.ColorImages[i]?.Length > 0)
                    {
                        var file = dto.ColorImages[i];
                        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                        var filePath = Path.Combine(colorFolder, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        colorImageUrl = $"uploads/products/colors/{fileName}";
                    }

                    colors.Add(new ProductColor
                    {
                        Name = colorName,
                        HexCode = string.IsNullOrWhiteSpace(hex) ? null : hex,
                        ImageUrl = colorImageUrl,
                        SortOrder = i
                    });
                }
            }

            if (colors.Count > 0)
                product.Colors = colors;
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

        public async Task<ProductDto> UpdateAsync(int id, ProductUpdateDto dto, string webRootPath)
        {
            var product = await _db.Products.FindAsync(id)
                ?? throw new KeyNotFoundException("Product not found.");

            product.ProductName = dto.ProductName;
            product.Brand = dto.Brand;
            product.Price = dto.Price;
            product.Discount = dto.Discount;
            product.OldPrice = dto.Discount > 0 ? dto.Price / (1 - dto.Discount / 100) : null;
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

            // Colors are optional — only touched if the caller actually sent a color list.
            if (dto.ColorNames != null)
            {
                var existingColors = await _db.ProductColors.Where(c => c.ProductId == id).ToListAsync();
                if (existingColors.Count > 0)
                    _db.ProductColors.RemoveRange(existingColors);

                if (dto.ColorNames.Count > 0)
                {
                    var colorFolder = Path.Combine(webRootPath, "uploads", "products", "colors");
                    Directory.CreateDirectory(colorFolder);

                    for (int i = 0; i < dto.ColorNames.Count; i++)
                    {
                        var colorName = dto.ColorNames[i];
                        if (string.IsNullOrWhiteSpace(colorName)) continue;

                        string? hex = (dto.ColorHexes != null && i < dto.ColorHexes.Count) ? dto.ColorHexes[i] : null;
                        string? colorImageUrl = (dto.ColorExistingImageUrls != null && i < dto.ColorExistingImageUrls.Count && !string.IsNullOrWhiteSpace(dto.ColorExistingImageUrls[i]))
                            ? dto.ColorExistingImageUrls[i]
                            : null;

                        if (dto.ColorImages != null && i < dto.ColorImages.Count && dto.ColorImages[i]?.Length > 0)
                        {
                            var file = dto.ColorImages[i];
                            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                            var filePath = Path.Combine(colorFolder, fileName);

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }

                            colorImageUrl = $"uploads/products/colors/{fileName}";
                        }

                        _db.ProductColors.Add(new ProductColor
                        {
                            ProductId = id,
                            Name = colorName,
                            HexCode = string.IsNullOrWhiteSpace(hex) ? null : hex,
                            ImageUrl = colorImageUrl,
                            SortOrder = i
                        });
                    }
                }
            }

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
