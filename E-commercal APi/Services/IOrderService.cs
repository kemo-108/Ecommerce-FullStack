using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IOrderService
    {
        Task<OrderDto> PlaceOrderAsync(int userId, PlaceOrderDto dto);
        Task<List<OrderDto>> GetMyOrdersAsync(int userId);
        Task<OrderDto?> GetByIdAsync(int orderId);
        Task<List<OrderDto>> GetAllAsync();
        Task<OrderDto> AdminCreateOrderAsync(AdminCreateOrderDto dto);
        Task UpdateStatusAsync(int orderId, string status);
        Task DeleteAsync(int orderId);
    }
}
