using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class CouponService : ICouponService
    {
        private readonly AppDbContext _db;

        public CouponService(AppDbContext db)
        {
            _db = db;
        }

        private static CouponDto ToDto(Coupon c) => new()
        {
            Id = c.Id,
            Code = c.Code,
            Description = c.Description,
            DiscountType = c.DiscountType,
            DiscountValue = c.DiscountValue,
            MinOrder = c.MinOrder,
            MaxDiscount = c.MaxDiscount,
            Usage = c.Useage,
            UsageLimit = c.UseageLimit,
            ExpiryDate = c.ExpiryDate.ToString("yyyy-MM-dd"),
            Status = c.Status,
        };

        public async Task<List<CouponDto>> GetAllAsync()
        {
            var coupons = await _db.Coupons.ToListAsync();
            return coupons.Select(ToDto).ToList();
        }

        public async Task<CouponDto> CreateAsync(CouponCreateDto dto)
        {
            var coupon = new Coupon
            {
                Code = dto.Code,
                Description = dto.Description,
                DiscountType = dto.DiscountType,
                DiscountValue = dto.DiscountValue,
                MinOrder = dto.MinOrder,
                MaxDiscount = dto.MaxDiscount,
                UseageLimit = dto.UsageLimit,
                Useage = 0,
                ExpiryDate = dto.ExpiryDate,
                Status = dto.Status,
            };

            _db.Coupons.Add(coupon);
            await _db.SaveChangesAsync();

            return ToDto(coupon);
        }

        public async Task<CouponDto> UpdateAsync(int id, CouponCreateDto dto)
        {
            var coupon = await _db.Coupons.FindAsync(id)
                ?? throw new KeyNotFoundException("Coupon not found.");

            coupon.Code = dto.Code;
            coupon.Description = dto.Description;
            coupon.DiscountType = dto.DiscountType;
            coupon.DiscountValue = dto.DiscountValue;
            coupon.MinOrder = dto.MinOrder;
            coupon.MaxDiscount = dto.MaxDiscount;
            coupon.UseageLimit = dto.UsageLimit;
            coupon.ExpiryDate = dto.ExpiryDate;
            coupon.Status = dto.Status;

            await _db.SaveChangesAsync();

            return ToDto(coupon);
        }

        public async Task DeleteAsync(int id)
        {
            var coupon = await _db.Coupons.FindAsync(id)
                ?? throw new KeyNotFoundException("Coupon not found.");

            _db.Coupons.Remove(coupon);
            await _db.SaveChangesAsync();
        }
    }
}
