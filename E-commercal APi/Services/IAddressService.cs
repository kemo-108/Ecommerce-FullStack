using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IAddressService
    {
        Task<List<AddressDto>> GetMyAddressesAsync(int userId);
        Task<AddressDto> CreateAsync(int userId, AddressCreateDto dto);
        Task<AddressDto> UpdateAsync(int userId, int addressId, AddressCreateDto dto);
        Task DeleteAsync(int userId, int addressId);
        Task<AddressDto> SetDefaultAsync(int userId, int addressId);
    }
}