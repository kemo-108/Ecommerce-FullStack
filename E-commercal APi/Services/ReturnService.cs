using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class ReturnService : IReturnService
    {
        private readonly AppDbContext _db;

        public ReturnService(AppDbContext db)
        {
            _db = db;
        }

        private static ReturnDto ToDto(Return r) => new()
        {
            ReturnId = r.ReturnId,
            OrderId = r.OrderId,
            CustomerName = r.User?.Name,
            Qty = r.Qty,
            Total = r.Total,
            Reason = r.Reason,
            Date = r.Date,
            Status = r.Status,
            Items = r.Items?.Select(i => new ReturnItemDto
            {
                ProductId = i.ProductId,
                ProductName = i.Product?.ProductName,
                Quantity = i.Quantity,
            }).ToList() ?? new(),
        };

        public async Task<List<ReturnDto>> GetAllAsync()
        {
            var returns = await _db.Returns
                .Include(r => r.User)
                .Include(r => r.Items).ThenInclude(i => i.Product)
                .OrderByDescending(r => r.Date)
                .ToListAsync();

            return returns.Select(ToDto).ToList();
        }

        public async Task<List<ReturnDto>> GetMyReturnsAsync(int userId)
        {
            var returns = await _db.Returns
                .Include(r => r.User)
                .Include(r => r.Items).ThenInclude(i => i.Product)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.Date)
                .ToListAsync();

            return returns.Select(ToDto).ToList();
        }

        public async Task<ReturnDto> CreateAsync(int userId, ReturnCreateDto dto)
        {
            var order = await _db.Orders.FindAsync(dto.OrderId)
                ?? throw new KeyNotFoundException("Order not found.");

            if (order.UserId != userId)
                throw new UnauthorizedAccessException("This order does not belong to you.");

            var ret = new Return
            {
                OrderId = dto.OrderId,
                UserId = userId,
                Qty = dto.Items.Sum(i => i.Quantity),
                Total = dto.Total,
                Reason = dto.Reason,
                Date = DateTime.UtcNow,
                Status = "pending",
                Items = dto.Items.Select(i => new ReturnItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                }).ToList(),
            };

            _db.Returns.Add(ret);
            await _db.SaveChangesAsync();

            var created = await _db.Returns
                .Include(r => r.User)
                .Include(r => r.Items).ThenInclude(i => i.Product)
                .FirstAsync(r => r.ReturnId == ret.ReturnId);

            return ToDto(created);
        }

        public async Task<ReturnDto> UpdateStatusAsync(int returnId, ReturnStatusUpdateDto dto)
        {
            var ret = await _db.Returns
                .Include(r => r.User)
                .Include(r => r.Items).ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(r => r.ReturnId == returnId)
                ?? throw new KeyNotFoundException("Return not found.");

            ret.Status = dto.Status;
            await _db.SaveChangesAsync();

            return ToDto(ret);
        }
    }
}
