using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _db;

        public CategoryService(AppDbContext db)
        {
            _db = db;
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

        public async Task<CategoryDto> CreateAsync(CategoryCreateDto dto, string webRootPath)
        {
            string? imageUrl = null;

            if (dto.Image != null)
            {
                var uploadsFolder = Path.Combine(webRootPath, "uploads", "categories");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                imageUrl = $"uploads/categories/{fileName}";
            }

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

        public async Task<CategoryDto> UpdateAsync(int id, CategoryCreateDto dto, string webRootPath)
        {
            var category = await _db.Categories.FindAsync(id)
                ?? throw new KeyNotFoundException("Category not found.");

            category.Name = dto.Name;
            category.Description = dto.Description;
            category.Featured = dto.Featured;
            category.Status = dto.Status;

            if (dto.Image != null)
            {
                var uploadsFolder = Path.Combine(webRootPath, "uploads", "categories");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                category.Image = $"uploads/categories/{fileName}";
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
        }
    }
}
