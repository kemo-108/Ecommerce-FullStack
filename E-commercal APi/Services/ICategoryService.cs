using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<CategoryDto> CreateAsync(CategoryCreateDto dto);
        Task<CategoryDto> UpdateAsync(int id, CategoryCreateDto dto);
        Task DeleteAsync(int id);
    }
}
