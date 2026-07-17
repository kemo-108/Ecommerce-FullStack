using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface ICartService
    {
        Task<List<CartItemDto>> GetCartAsync(int userId);
        Task<CartItemDto> AddToCartAsync(int userId, CartItemCreateDto dto);
        Task<CartItemDto> UpdateCartItemAsync(int userId, int cartItemId, CartItemUpdateDto dto);
        Task DeleteCartItemAsync(int userId, int cartItemId);
    }
}
