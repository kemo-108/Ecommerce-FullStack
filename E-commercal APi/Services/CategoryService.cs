using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CategoryService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<IEnumerable<CategoryVM>> GetAllCategoriesAsync()
        {
            var categories = await _context.Categories
                .Include(c => c.Products)
                .AsNoTracking()
                .ToListAsync();

            return categories.Select(MapToVM);
        }

        public async Task<CategoryVM?> GetCategoryByIdAsync(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            return category == null ? null : MapToVM(category);
        }

        public async Task<CategoryVM> CreateAsync(CategoryCreateVM dto)
        {
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description,
                Featured = dto.Featured,
                Status = string.IsNullOrWhiteSpace(dto.Status) ? "active" : dto.Status,
                CreatedAt = DateTime.UtcNow
            };

            if (dto.Image != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "categories");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                category.Image = $"/uploads/categories/{fileName}";
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return await GetCategoryByIdAsync(category.Id);
        }

        public async Task<bool> UpdateAsync(int id, CategoryUpdateVM dto)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return false;

            category.Name = dto.Name;
            category.Description = dto.Description;
            category.Featured = dto.Featured;
            category.Status = dto.Status;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        private static CategoryVM MapToVM(Category c)
        {
            return new CategoryVM
            {
                Id = c.Id,
                Name = c.Name,
                Image = c.Image,
                Description = c.Description,
                Featured = c.Featured,
                Status = c.Status,
                ProductsCount = c.Products?.Count ?? 0,
                CreatedAt = c.CreatedAt
            };
        }
    }
}
