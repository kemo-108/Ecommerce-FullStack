using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IWishlistService
    {
        Task<List<WishlistItemDto>> GetWishlistAsync(int userId);
        Task<WishlistItemDto> AddAsync(int userId, WishlistCreateDto dto);
        Task RemoveAsync(int userId, int wishlistId);
    }
}
