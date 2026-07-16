using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<ProductVM> CreateAsync(ProductCreateVM dto)
        {
            var product = new Product
            {
                ProductName = dto.ProductName,
                Price = dto.Price,
                OldPrice = dto.OldPrice,
                Discount = dto.Discount,
                Brand = dto.Brand,
                Code = dto.Code,
                Sku = dto.Sku,
                Description = dto.Description,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.UtcNow
            };

            if (dto.Images != null && dto.Images.Count > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "products");
                Directory.CreateDirectory(uploadsFolder);

                var savedUrls = new List<string>();

                foreach (var file in dto.Images)
                {
                    var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    savedUrls.Add($"/uploads/products/{fileName}");
                }

                product.ImageUrl = savedUrls[0];

                if (savedUrls.Count > 1)
                {
                    product.Images = savedUrls.Skip(1)
                        .Select((url, index) => new ProductImage { ImageUrl = url, SortOrder = index })
                        .ToList();
                }
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return await GetProductByIdAsync(product.ProductId);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductVM>> GetAllProductsAsync()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.InventoryRecords)
                .AsNoTracking()
                .ToListAsync();

            return products.Select(p => new ProductVM
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Category = p.Category?.Name,
                Rating = p.Rating,
                Stock = p.InventoryRecords?.Sum(i => i.Stock) ?? 0
            });
        }
        public async Task<ProductVM?> GetProductByIdAsync(int id)
        {
            var p = await _context.Products
                .Include(x => x.Category)
                .Include(x => x.InventoryRecords)
                .FirstOrDefaultAsync(x => x.ProductId == id);

            if (p == null) return null;

            return new ProductVM
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Category = p.Category?.Name,
                Rating = p.Rating,
                Stock = p.InventoryRecords?.Sum(i => i.Stock) ?? 0,
                OldPrice = p.OldPrice,
                Discount = p.Discount,
                Brand = p.Brand,
                Sku = p.Sku,
                Description = p.Description
            };
        }

        public async Task<bool> UpdateAsync(int id, ProductUpdateVM dto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
                return false;

            product.ProductName = dto.ProductName;
            product.Price = dto.Price;
            product.OldPrice = dto.OldPrice;
            product.Discount = dto.Discount;
            product.Brand = dto.Brand;
            product.Sku = dto.Sku;
            product.Description = dto.Description;
            product.CategoryId = dto.CategoryId;
            product.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
