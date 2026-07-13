using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductVM>> GetAllProductsAsync();
        Task<ProductVM?> GetProductByIdAsync(int id);
        Task<ProductVM> CreateAsync(ProductCreateVM dto);
        Task<bool> UpdateAsync(int id, ProductUpdateVM dto);
        Task<bool> DeleteAsync(int id);
    }
}
