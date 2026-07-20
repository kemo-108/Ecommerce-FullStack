using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IRefundService
    {
        Task<List<RefundDto>> GetAllAsync();
        Task<List<RefundDto>> GetMyRefundsAsync(int userId);
        Task<RefundDto> CreateAsync(int userId, RefundCreateDto dto);
        Task<RefundDto> UpdateStatusAsync(int id, RefundStatusUpdateDto dto);
    }
}
