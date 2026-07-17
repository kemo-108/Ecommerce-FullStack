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

        public async Task<CategoryDto> CreateAsync(CategoryCreateDto dto)
        {
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description,
                Image = dto.Image,
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
            category.Image = dto.Image;
            category.Featured = dto.Featured;
            category.Status = dto.Status;

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
