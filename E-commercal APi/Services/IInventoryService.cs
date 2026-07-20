using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IInventoryService
    {
        Task<List<InventoryDto>> GetAllAsync();
        Task<InventoryDto> UpdateAsync(int id, InventoryUpdateDto dto);
        Task<InventoryDto> RestockAsync(int id, int userId, RestockDto dto);
        Task<List<StockMovementDto>> GetMovementsAsync(int id);
    }
}
