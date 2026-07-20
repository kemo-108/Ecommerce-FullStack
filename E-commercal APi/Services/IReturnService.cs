using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IReturnService
    {
        Task<List<ReturnDto>> GetAllAsync();
        Task<List<ReturnDto>> GetMyReturnsAsync(int userId);
        Task<ReturnDto> CreateAsync(int userId, ReturnCreateDto dto);
        Task<ReturnDto> UpdateStatusAsync(int returnId, ReturnStatusUpdateDto dto);
    }
}
