using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly AppDbContext _db;

        public InventoryService(AppDbContext db)
        {
            _db = db;
        }

        private static InventoryDto ToDto(Inventory i) => new()
        {
            Id = i.Id,
            ProductId = i.ProductId,
            ProductName = i.Product?.ProductName,
            ImageUrl = i.Product?.ImageUrl,
            Category = i.Product?.Category?.Name,
            Warehouse = i.Warehouse?.Name,
            Sku = i.Sku,
            Barcode = i.Barcode,
            Stock = i.Stock,
            MinStock = i.MinStock,
            LastUpdated = i.LastUpdated,
        };

        public async Task<List<InventoryDto>> GetAllAsync()
        {
            var records = await _db.Inventory
                .Include(i => i.Product).ThenInclude(p => p.Category)
                .Include(i => i.Warehouse)
                .OrderBy(i => i.Product.ProductName)
                .ToListAsync();

            return records.Select(ToDto).ToList();
        }

        public async Task<InventoryDto> UpdateAsync(int id, InventoryUpdateDto dto)
        {
            var record = await _db.Inventory
                .Include(i => i.Product).ThenInclude(p => p.Category)
                .Include(i => i.Warehouse)
                .FirstOrDefaultAsync(i => i.Id == id)
                ?? throw new KeyNotFoundException("Inventory record not found.");

            record.Sku = dto.Sku;
            record.Barcode = dto.Barcode;
            record.MinStock = dto.MinStock;
            record.LastUpdated = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return ToDto(record);
        }

        public async Task<InventoryDto> RestockAsync(int id, int userId, RestockDto dto)
        {
            var record = await _db.Inventory
                .Include(i => i.Product).ThenInclude(p => p.Category)
                .Include(i => i.Warehouse)
                .FirstOrDefaultAsync(i => i.Id == id)
                ?? throw new KeyNotFoundException("Inventory record not found.");

            record.Stock += dto.Quantity;
            record.LastUpdated = DateTime.UtcNow;

            _db.StockMovements.Add(new StockMovement
            {
                InventoryId = record.Id,
                Type = "restock",
                Quantity = dto.Quantity,
                Reason = dto.Reason,
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow,
            });

            await _db.SaveChangesAsync();
            return ToDto(record);
        }

        public async Task<List<StockMovementDto>> GetMovementsAsync(int id)
        {
            var movements = await _db.StockMovements
                .Include(m => m.CreatedByUser)
                .Where(m => m.InventoryId == id)
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new StockMovementDto
                {
                    Id = m.Id,
                    Type = m.Type,
                    Quantity = m.Quantity,
                    Reason = m.Reason,
                    CreatedByName = m.CreatedByUser != null ? m.CreatedByUser.Name : "System",
                    CreatedAt = m.CreatedAt,
                })
                .ToListAsync();

            return movements;
        }
    }
}
