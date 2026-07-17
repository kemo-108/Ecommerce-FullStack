using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface ICouponService
    {
        Task<List<CouponDto>> GetAllAsync();
        Task<CouponDto> CreateAsync(CouponCreateDto dto);
        Task<CouponDto> UpdateAsync(int id, CouponCreateDto dto);
        Task DeleteAsync(int id);
    }
}
