using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface ICustomerService
    {
        Task<List<CustomerListDto>> GetAllAsync();
        Task<CustomerListDto?> GetByIdAsync(int id);
        Task<CustomerListDto> CreateAsync(CustomerCreateDto dto);
        Task<CustomerListDto> UpdateAsync(int id, CustomerUpdateDto dto);
        Task DeleteAsync(int id);
    }
}
