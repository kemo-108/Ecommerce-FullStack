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

        private static int AvailableStock(Product? p) =>
            p?.InventoryRecords?.Sum(i => i.Stock) ?? 0;

        private static CartItemDto ToDto(CartItem c) => new()
        {
            Id = c.Id,
            ProductId = c.ProductId,
            ProductName = c.Product?.ProductName,
            ImageUrl = c.Product?.ImageUrl,
            Price = c.Product?.Price ?? 0,
            Qty = c.Qty,
            Stock = AvailableStock(c.Product),
            ColorName = c.ColorName,
            ColorHexCode = c.ColorHexCode,
            SizeName = c.SizeName,
        };

        public async Task<List<CartItemDto>> GetCartAsync(int userId)
        {
            var items = await _db.CartItems
                .Include(c => c.Product)
                    .ThenInclude(p => p.InventoryRecords)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return items.Select(ToDto).ToList();
        }

        public async Task<CartItemDto> AddToCartAsync(int userId, CartItemCreateDto dto)
        {
            var product = await _db.Products
                .Include(p => p.InventoryRecords)
                .FirstOrDefaultAsync(p => p.ProductId == dto.ProductId)
                ?? throw new KeyNotFoundException("Product not found.");

            var availableStock = AvailableStock(product);

            var existing = await _db.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId
                    && c.ProductId == dto.ProductId
                    && c.SizeName == dto.SizeName
                    && c.ColorName == dto.ColorName);

            var requestedQty = (existing?.Qty ?? 0) + dto.Qty;

            if (requestedQty > availableStock)
                throw new InvalidOperationException(
                    $"Only {availableStock} unit(s) of this product are in stock.");

            if (existing != null)
            {
                existing.Qty = requestedQty;
                existing.Product = product;
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
                Product = product,
                SizeName = dto.SizeName,
            };

            _db.CartItems.Add(item);
            await _db.SaveChangesAsync();

            return ToDto(item);
        }

        public async Task<CartItemDto> UpdateCartItemAsync(int userId, int cartItemId, CartItemUpdateDto dto)
        {
            var item = await _db.CartItems
                .Include(c => c.Product)
                    .ThenInclude(p => p.InventoryRecords)
                .FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId)
                ?? throw new KeyNotFoundException("Cart item not found.");

            var availableStock = AvailableStock(item.Product);
            var newQty = Math.Max(1, dto.Qty);

            if (newQty > availableStock)
                throw new InvalidOperationException(
                    $"Only {availableStock} unit(s) of this product are in stock.");

            item.Qty = newQty;
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
                // نوصل للـ SaveChanges بتاعتنا.
            }
        }
    }
}