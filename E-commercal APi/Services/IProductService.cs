using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(int id);
        Task<ProductDto> CreateAsync(ProductCreateDto dto, string webRootPath);
        Task<ProductDto> UpdateAsync(int id, ProductUpdateDto dto, string webRootPath);
        Task DeleteAsync(int id);
    }
}
