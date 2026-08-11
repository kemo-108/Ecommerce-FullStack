using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _db;
        private readonly ICloudinaryService _cloudinary;

        public CategoryService(AppDbContext db, ICloudinaryService cloudinary)
        {
            _db = db;
            _cloudinary = cloudinary;
        }

        private CategoryDto ToDto(Category c) => new()
        {
            Id = c.Id,
            Name = c.Name,
            Description = c.Description,
            Image = c.Image,
            Featured = c.Featured,
            Status = c.Status,
            Products = _db.Products.Count(p => p.CategoryId == c.Id),
            CreatedAt = c.CreatedAt.ToString("d MMM yyyy"),
            CreatedTime = c.CreatedAt.ToString("hh:mm tt"),
        };

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            var categories = await _db.Categories
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return categories.Select(ToDto).ToList();
        }

        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var category = await _db.Categories.FindAsync(id);
            return category == null ? null : ToDto(category);
        }

        public async Task<CategoryDto> CreateAsync(CategoryCreateDto dto)
        {
            var imageUrl = dto.Image;

            if (dto.ImageFile != null && dto.ImageFile.Length > 0)
                imageUrl = await _cloudinary.UploadImageAsync(dto.ImageFile, "ecommerce/categories");

            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description,
                Image = imageUrl,
                Featured = dto.Featured,
                Status = dto.Status,
                CreatedAt = DateTime.UtcNow,
            };

            _db.Categories.Add(category);
            await _db.SaveChangesAsync();

            return ToDto(category);
        }

        public async Task<CategoryDto> UpdateAsync(int id, CategoryCreateDto dto)
        {
            var category = await _db.Categories.FindAsync(id)
                ?? throw new KeyNotFoundException("Category not found.");

            category.Name = dto.Name;
            category.Description = dto.Description;
            category.Featured = dto.Featured;
            category.Status = dto.Status;

            if (dto.ImageFile != null && dto.ImageFile.Length > 0)
            {
                var oldImage = category.Image;
                category.Image = await _cloudinary.UploadImageAsync(dto.ImageFile, "ecommerce/categories");

                if (!string.IsNullOrWhiteSpace(oldImage) && oldImage != category.Image)
                {
                    try { await _cloudinary.DeleteImageAsync(oldImage); }
                    catch { /* best-effort cleanup - don't fail the update over it */ }
                }
            }
            else if (dto.RemoveImage)
            {
                var oldImage = category.Image;
                category.Image = null;

                if (!string.IsNullOrWhiteSpace(oldImage))
                {
                    try { await _cloudinary.DeleteImageAsync(oldImage); }
                    catch { /* best-effort cleanup */ }
                }
            }
            else if (!string.IsNullOrWhiteSpace(dto.Image))
            {
                category.Image = dto.Image;
            }

            await _db.SaveChangesAsync();

            return ToDto(category);
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _db.Categories.FindAsync(id)
                ?? throw new KeyNotFoundException("Category not found.");

            _db.Categories.Remove(category);
            await _db.SaveChangesAsync();

            if (!string.IsNullOrWhiteSpace(category.Image))
            {
                try { await _cloudinary.DeleteImageAsync(category.Image); }
                catch { /* best-effort cleanup - the category is already deleted either way */ }
            }
        }
    }
}
