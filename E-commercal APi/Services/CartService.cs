using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _db;

        public CartService(AppDbContext db)
        {
            _db = db;
        }

        private static CartItemDto ToDto(CartItem c) => new()
        {
            Id = c.Id,
            ProductId = c.ProductId,
            ProductName = c.Product?.ProductName,
            ImageUrl = c.Product?.ImageUrl,
            Price = c.Product?.Price ?? 0,
            Qty = c.Qty,
            ColorName = c.ColorName,
            ColorHexCode = c.ColorHexCode,
        };

        public async Task<List<CartItemDto>> GetCartAsync(int userId)
        {
            var items = await _db.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return items.Select(ToDto).ToList();
        }

        public async Task<CartItemDto> AddToCartAsync(int userId, CartItemCreateDto dto)
        {
            var existing = await _db.CartItems
                .Include(c => c.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId
                    && c.ProductId == dto.ProductId
                    && c.ColorName == dto.ColorName);

            if (existing != null)
            {
                existing.Qty += dto.Qty;
                await _db.SaveChangesAsync();
                return ToDto(existing);
            }

            var item = new CartItem
            {
                UserId = userId,
                ProductId = dto.ProductId,
                Qty = dto.Qty,
                ColorName = dto.ColorName,
                ColorHexCode = dto.ColorHexCode,
                CreatedAt = DateTime.UtcNow,
            };

            _db.CartItems.Add(item);
            await _db.SaveChangesAsync();

            await _db.Entry(item).Reference(c => c.Product).LoadAsync();
            return ToDto(item);
        }

        public async Task<CartItemDto> UpdateCartItemAsync(int userId, int cartItemId, CartItemUpdateDto dto)
        {
            var item = await _db.CartItems
                .Include(c => c.Product)
                .FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId)
                ?? throw new KeyNotFoundException("Cart item not found.");

            item.Qty = Math.Max(1, dto.Qty);
            await _db.SaveChangesAsync();

            return ToDto(item);
        }

        public async Task DeleteCartItemAsync(int userId, int cartItemId)
        {
            var item = await _db.CartItems
                .FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId)
                ?? throw new KeyNotFoundException("Cart item not found.");

            _db.CartItems.Remove(item);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // الصف اتحذف بالفعل من طلب تاني (double click) قبل ما إحنا
                // نوصل للـ SaveChanges بتاعتنا. النتيجة اللي إحنا عايزينها
                // (العنصر يتشال) أصلاً حصلت، فمنعتبرهاش مشكلة.
            }
        }
    }
}
