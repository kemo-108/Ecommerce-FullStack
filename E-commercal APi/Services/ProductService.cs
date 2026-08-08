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

        private static readonly HashSet<string> AllowedImageExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg", ".jpeg", ".png", ".webp", ".gif"
        };
        private const long MaxImageBytes = 5 * 1024 * 1024; // 5 MB

        // Uploads previously accepted any file with no extension/size/content-type
        // check, so an admin account (or a hijacked admin session) could drop an
        // executable or script into wwwroot/uploads. Reject anything that isn't a
        // small, genuinely-image file before it ever touches disk.
        private static void ValidateImage(Microsoft.AspNetCore.Http.IFormFile file)
        {
            var ext = Path.GetExtension(file.FileName);
            if (string.IsNullOrEmpty(ext) || !AllowedImageExtensions.Contains(ext))
                throw new InvalidOperationException($"'{file.FileName}' is not an allowed image type.");

            if (!file.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException($"'{file.FileName}' is not a valid image.");

            if (file.Length <= 0 || file.Length > MaxImageBytes)
                throw new InvalidOperationException($"'{file.FileName}' must be an image under 5 MB.");
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
            Sizes = p.Sizes?.Select(s => new ProductSizeDto
            {
                Id = s.Id,
                Name = s.Name
            }).OrderBy(s => s.Id).ToList() ?? new List<ProductSizeDto>(),
        };

        public async Task<(List<ProductDto> Products, int TotalCount)> GetAllAsync(string? search = null, int page = 1, int pageSize = 12, int? categoryId = null)
        {
            var query = _db.Products
                .Include(p => p.Category)
                .Include(p => p.InventoryRecords)
                .Include(p => p.Colors)
                .Include(p => p.Sizes)
                .AsQueryable();

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

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
                .Include(p => p.Sizes)
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
                    ValidateImage(file);
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
            var sizes = new List<ProductSize>();
            if (dto.SizeNames != null && dto.SizeNames.Count > 0)
            {
                for (int i = 0; i < dto.SizeNames.Count; i++)
                {
                    var sizeName = dto.SizeNames[i];
                    if (string.IsNullOrWhiteSpace(sizeName)) continue;

                    sizes.Add(new ProductSize { Name = sizeName, SortOrder = i });
                }
            }

            if (sizes.Count > 0)
                product.Sizes = sizes;
            _db.Products.Add(product);
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
                        ValidateImage(file);
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
            await _db.SaveChangesAsync();

            // Seed an inventory record so Qty shows up immediately. There was
            // never any Warehouse row in the database, so this used to find
            // nothing and silently skip creating Inventory — meaning Stock
            // stayed 0 forever no matter what the admin typed. Create one on
            // first use instead of assuming it already exists.
            var defaultWarehouse = await _db.Warehouses.FirstOrDefaultAsync();
            if (defaultWarehouse == null)
            {
                defaultWarehouse = new Warehouse { Name = "Main Warehouse", Address = "N/A", Phone = "N/A", Status = "active" };
                _db.Warehouses.Add(defaultWarehouse);
                await _db.SaveChangesAsync();
            }

            _db.Inventory.Add(new Inventory
            {
                ProductId = product.ProductId,
                WarehouseId = defaultWarehouse.Id,
                Sku = dto.Code ?? $"SKU-{product.ProductId}",
                Barcode = "N/A",
                Stock = dto.Qty,
                MinStock = 5,
                LastUpdated = DateTime.UtcNow,
            });
            await _db.SaveChangesAsync();

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

            if (dto.CategoryId.HasValue)
            {
                product.CategoryId = dto.CategoryId.Value;
            }

            var inventory = await _db.Inventory
                .FirstOrDefaultAsync(i => i.ProductId == id);

            if (inventory != null)
            {
                inventory.Stock = dto.Qty;
                inventory.LastUpdated = DateTime.UtcNow;
            }
            else
            {
                // This product predates the Warehouse fix above and never got
                // an Inventory row, so there was nothing here to update and
                // Stock edits were silently ignored. Create it now instead.
                var defaultWarehouse = await _db.Warehouses.FirstOrDefaultAsync();
                if (defaultWarehouse == null)
                {
                    defaultWarehouse = new Warehouse { Name = "Main Warehouse", Address = "N/A", Phone = "N/A", Status = "active" };
                    _db.Warehouses.Add(defaultWarehouse);
                    await _db.SaveChangesAsync();
                }

                _db.Inventory.Add(new Inventory
                {
                    ProductId = id,
                    WarehouseId = defaultWarehouse.Id,
                    Sku = product.Code ?? $"SKU-{id}",
                    Barcode = "N/A",
                    Stock = dto.Qty,
                    MinStock = 5,
                    LastUpdated = DateTime.UtcNow,
                });
            }
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
                            ValidateImage(file);
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
            if (dto.SizeNames != null)
            {
                var existingSizes = await _db.ProductSizes.Where(s => s.ProductId == id).ToListAsync();
                if (existingSizes.Count > 0)
                    _db.ProductSizes.RemoveRange(existingSizes);

                if (dto.SizeNames.Count > 0)
                {
                    for (int i = 0; i < dto.SizeNames.Count; i++)
                    {
                        var sizeName = dto.SizeNames[i];
                        if (string.IsNullOrWhiteSpace(sizeName)) continue;

                        _db.ProductSizes.Add(new ProductSize
                        {
                            ProductId = id,
                            Name = sizeName,
                            SortOrder = i
                        });
                    }
                }
            }
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