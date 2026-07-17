using System.Security.Claims;
using E_commercal_APi.Services;
using E_commercal_APi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/cart")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var items = await _cartService.GetCartAsync(UserId);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(CartItemCreateDto dto)
        {
            var item = await _cartService.AddToCartAsync(UserId, dto);
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, CartItemUpdateDto dto)
        {
            try
            {
                var item = await _cartService.UpdateCartItemAsync(UserId, id, dto);
                return Ok(item);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            try
            {
                await _cartService.DeleteCartItemAsync(UserId, id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
