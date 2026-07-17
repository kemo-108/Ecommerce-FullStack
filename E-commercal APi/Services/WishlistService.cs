using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly AppDbContext _db;

        public WishlistService(AppDbContext db)
        {
            _db = db;
        }

        private static WishlistItemDto ToDto(Wishlist w) => new()
        {
            Id = w.Id,
            ProductId = w.ProductId,
            ProductName = w.Product?.ProductName,
            ImageUrl = w.Product?.ImageUrl,
            Price = w.Product?.Price ?? 0,
            OldPrice = w.Product?.OldPrice,
            Rating = w.Product?.Rating,
            Stock = w.Product?.InventoryRecords?.Sum(i => i.Stock) ?? 0,
        };

        public async Task<List<WishlistItemDto>> GetWishlistAsync(int userId)
        {
            var items = await _db.Wishlists
                .Include(w => w.Product)
                .ThenInclude(p => p.InventoryRecords)
                .Where(w => w.UserId == userId)
                .ToListAsync();

            return items.Select(ToDto).ToList();
        }

        public async Task<WishlistItemDto> AddAsync(int userId, WishlistCreateDto dto)
        {
            var existing = await _db.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == dto.ProductId);

            if (existing != null)
            {
                await _db.Entry(existing).Reference(w => w.Product).LoadAsync();
                return ToDto(existing);
            }

            var item = new Wishlist
            {
                UserId = userId,
                ProductId = dto.ProductId,
                CreatedAt = DateTime.UtcNow,
            };

            _db.Wishlists.Add(item);
            await _db.SaveChangesAsync();

            await _db.Entry(item).Reference(w => w.Product).LoadAsync();
            return ToDto(item);
        }

        public async Task RemoveAsync(int userId, int wishlistId)
        {
            var item = await _db.Wishlists
                .FirstOrDefaultAsync(w => w.Id == wishlistId && w.UserId == userId)
                ?? throw new KeyNotFoundException("Wishlist item not found.");

            _db.Wishlists.Remove(item);
            await _db.SaveChangesAsync();
        }
    }
}
