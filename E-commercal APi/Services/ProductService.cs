using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _db;
        private readonly ICloudinaryService _cloudinary;

        public ProductService(AppDbContext db, ICloudinaryService cloudinary)
        {
            _db = db;
            _cloudinary = cloudinary;
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
            GalleryImages = p.Images?
                .OrderBy(i => i.SortOrder)
                .Select(i => i.ImageUrl)
                .ToList() ?? new List<string>(),
        };

        public async Task<(List<ProductDto> Products, int TotalCount)> GetAllAsync(string? search = null, int page = 1, int pageSize = 12, int? categoryId = null)
        {
            var query = _db.Products
                .Include(p => p.Category)
                .Include(p => p.InventoryRecords)
                .Include(p => p.Colors)
                .Include(p => p.Sizes)
                .Include(p => p.Images)
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
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            return product == null ? null : ToDto(product);
        }

        public async Task<ProductDto> CreateAsync(ProductCreateDto dto, string webRootPath)
        {
            string? imageUrl = null;
            var galleryImages = new List<ProductImage>();

            if (dto.Images != null && dto.Images.Count > 0)
            {
                for (int i = 0; i < dto.Images.Count; i++)
                {
                    var file = dto.Images[i];
                    ValidateImage(file);
                    var url = await _cloudinary.UploadImageAsync(file, "ecommerce/products");

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
                        colorImageUrl = await _cloudinary.UploadImageAsync(file, "ecommerce/products/colors");
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

            // A new main-image file was uploaded from the edit form - replace
            // the thumbnail and clean up the old Cloudinary image so it
            // doesn't just sit there unused forever.
            if (dto.Images != null && dto.Images.Count > 0 && dto.Images[0]?.Length > 0)
            {
                var file = dto.Images[0];
                ValidateImage(file);
                var oldImageUrl = product.ImageUrl;
                var newImageUrl = await _cloudinary.UploadImageAsync(file, "ecommerce/products");
                product.ImageUrl = newImageUrl;

                if (!string.IsNullOrWhiteSpace(oldImageUrl) && oldImageUrl != newImageUrl)
                {
                    try { await _cloudinary.DeleteImageAsync(oldImageUrl); }
                    catch { /* best-effort cleanup - don't fail the update over it */ }
                }
            }

            if (dto.CategoryId.HasValue)
            {
                product.CategoryId = dto.CategoryId.Value;
            }

            // Stock is owned by the Inventory page (InventoryController /
            // InventoryService.RestockAsync), not by this product edit form.
            // This used to overwrite inventory.Stock with dto.Qty on every
            // save, but the edit form never actually collects a quantity -
            // so dto.Qty was always the int default (0), and saving *any*
            // product edit (e.g. just fixing a typo) silently zeroed out
            // its stock. Don't touch Stock here at all.
            //
            // We still make sure a row exists, though - a product that
            // predates the Warehouse fix above may never have gotten an
            // Inventory row, and without one it can't be managed from the
            // Inventory page at all.
            var inventory = await _db.Inventory
                .FirstOrDefaultAsync(i => i.ProductId == id);

            if (inventory == null)
            {
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
                    Stock = 0, // set the real quantity from the Inventory page
                    MinStock = 5,
                    LastUpdated = DateTime.UtcNow,
                });
            }
            if (dto.ColorNames != null)
            {
                var existingColors = await _db.ProductColors.Where(c => c.ProductId == id).ToListAsync();

                // URLs the frontend explicitly asked to keep (unchanged colors).
                // Anything else on the old rows — a replaced image, or a color
                // that got removed entirely — is now orphaned on Cloudinary,
                // so clean it up instead of leaving it there forever.
                var keepUrls = new HashSet<string>(
                    (dto.ColorExistingImageUrls ?? new List<string>())
                        .Where(u => !string.IsNullOrWhiteSpace(u)),
                    StringComparer.OrdinalIgnoreCase);

                foreach (var old in existingColors)
                {
                    if (!string.IsNullOrWhiteSpace(old.ImageUrl) && !keepUrls.Contains(old.ImageUrl))
                    {
                        try { await _cloudinary.DeleteImageAsync(old.ImageUrl); }
                        catch { /* best-effort cleanup - don't fail the update over it */ }
                    }
                }

                if (existingColors.Count > 0)
                    _db.ProductColors.RemoveRange(existingColors);

                if (dto.ColorNames.Count > 0)
                {
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
                            colorImageUrl = await _cloudinary.UploadImageAsync(file, "ecommerce/products/colors");
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
                .Include(p => p.Images)
                .Include(p => p.Colors)
                .FirstOrDefaultAsync(p => p.ProductId == id)
                ?? throw new KeyNotFoundException("Product not found.");

            if (product.OrderItems.Any() || product.Reviews.Any())
                throw new InvalidOperationException(
                    "This product has order or review history and can't be deleted.");

            if (product.CartItems.Any())
                _db.CartItems.RemoveRange(product.CartItems);

            if (product.WishlistedBy.Any())
                _db.Wishlists.RemoveRange(product.WishlistedBy);

            // Collect every Cloudinary image this product owns before it's
            // gone from the DB, so we don't leave orphaned files behind.
            var imagesToDelete = new List<string>();
            if (!string.IsNullOrWhiteSpace(product.ImageUrl))
                imagesToDelete.Add(product.ImageUrl);
            imagesToDelete.AddRange(product.Images?.Select(i => i.ImageUrl).Where(u => !string.IsNullOrWhiteSpace(u)) ?? Enumerable.Empty<string>());
            imagesToDelete.AddRange(product.Colors?.Select(c => c.ImageUrl).Where(u => !string.IsNullOrWhiteSpace(u)) ?? Enumerable.Empty<string>());

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();

            foreach (var url in imagesToDelete)
            {
                try { await _cloudinary.DeleteImageAsync(url); }
                catch { /* best-effort cleanup - the product is already deleted either way */ }
            }
        }
    }
}