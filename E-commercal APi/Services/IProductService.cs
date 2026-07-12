using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductVM>> GetAllProductsAsync();
    }
}
