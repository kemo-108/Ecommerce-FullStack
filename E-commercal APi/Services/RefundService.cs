using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class RefundService : IRefundService
    {
        private readonly AppDbContext _db;

        public RefundService(AppDbContext db)
        {
            _db = db;
        }

        private static RefundDto ToDto(Refund r) => new()
        {
            Id = r.Id,
            OrderId = r.OrderId,
            CustomerName = r.User?.Name,
            CustomerAvatar = r.User?.Avatar,
            Amount = r.Amount,
            Reason = r.Reason,
            Status = r.Status,
            ProcessedAt = r.ProcessedAt,
            CreatedAt = r.CreatedAt,
        };

        public async Task<List<RefundDto>> GetAllAsync()
        {
            var refunds = await _db.Refunds
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return refunds.Select(ToDto).ToList();
        }

        public async Task<List<RefundDto>> GetMyRefundsAsync(int userId)
        {
            var refunds = await _db.Refunds
                .Include(r => r.User)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return refunds.Select(ToDto).ToList();
        }

        public async Task<RefundDto> CreateAsync(int userId, RefundCreateDto dto)
        {
            var order = await _db.Orders.FindAsync(dto.OrderId)
                ?? throw new KeyNotFoundException("Order not found.");

            if (order.UserId != userId)
                throw new UnauthorizedAccessException("This order does not belong to you.");

            var refund = new Refund
            {
                OrderId = dto.OrderId,
                UserId = userId,
                Amount = dto.Amount,
                Reason = dto.Reason,
                Status = "pending",
                CreatedAt = DateTime.UtcNow,
            };

            _db.Refunds.Add(refund);
            await _db.SaveChangesAsync();

            await _db.Entry(refund).Reference(r => r.User).LoadAsync();
            return ToDto(refund);
        }

        public async Task<RefundDto> UpdateStatusAsync(int id, RefundStatusUpdateDto dto)
        {
            var refund = await _db.Refunds
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id)
                ?? throw new KeyNotFoundException("Refund not found.");

            refund.Status = dto.Status;
            refund.ProcessedAt = DateTime.UtcNow;

            // Approving a refund marks the order's payment as refunded.
            if (dto.Status == "approved")
            {
                var order = await _db.Orders.FindAsync(refund.OrderId);
                if (order != null)
                {
                    order.PaymentStatus = "refunded";
                }
            }

            await _db.SaveChangesAsync();
            return ToDto(refund);
        }
    }
}
