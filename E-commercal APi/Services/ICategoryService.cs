using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryVM>> GetAllCategoriesAsync();
        Task<CategoryVM?> GetCategoryByIdAsync(int id);
        Task<CategoryVM> CreateAsync(CategoryCreateVM dto);
        Task<bool> UpdateAsync(int id, CategoryUpdateVM dto);
        Task<bool> DeleteAsync(int id);
    }
}
