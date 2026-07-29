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

        public async Task<CouponApplyResultDto> ValidateAsync(ApplyCouponDto dto)
        {
            var code = (dto.Code ?? string.Empty).Trim();

            if (string.IsNullOrEmpty(code))
            {
                return new CouponApplyResultDto
                {
                    Valid = false,
                    Message = "Please enter a coupon code.",
                };
            }

            var coupon = await _db.Coupons
                .FirstOrDefaultAsync(c => c.Code.ToLower() == code.ToLower());

            if (coupon == null)
            {
                return new CouponApplyResultDto
                {
                    Valid = false,
                    Message = "This coupon code doesn't exist.",
                };
            }

            if (!string.Equals(coupon.Status, "active", StringComparison.OrdinalIgnoreCase))
            {
                return new CouponApplyResultDto
                {
                    Valid = false,
                    Message = "This coupon is not currently active.",
                };
            }

            if (coupon.ExpiryDate.Date < DateTime.UtcNow.Date)
            {
                return new CouponApplyResultDto
                {
                    Valid = false,
                    Message = "This coupon has expired.",
                };
            }

            if (coupon.UseageLimit > 0 && coupon.Useage >= coupon.UseageLimit)
            {
                return new CouponApplyResultDto
                {
                    Valid = false,
                    Message = "This coupon has reached its usage limit.",
                };
            }

            if (coupon.MinOrder > 0 && dto.OrderTotal < coupon.MinOrder)
            {
                return new CouponApplyResultDto
                {
                    Valid = false,
                    Message = $"This coupon needs a minimum order of {coupon.MinOrder:0.##}.",
                };
            }

            decimal discountAmount;
            if (string.Equals(coupon.DiscountType, "Percentage", StringComparison.OrdinalIgnoreCase))
            {
                discountAmount = dto.OrderTotal * (coupon.DiscountValue / 100m);
                if (coupon.MaxDiscount > 0 && discountAmount > coupon.MaxDiscount)
                {
                    discountAmount = coupon.MaxDiscount;
                }
            }
            else
            {
                discountAmount = coupon.DiscountValue;
            }

            if (discountAmount > dto.OrderTotal)
            {
                discountAmount = dto.OrderTotal;
            }

            discountAmount = Math.Round(discountAmount, 2);

            return new CouponApplyResultDto
            {
                Valid = true,
                Message = "Coupon applied successfully.",
                CouponId = coupon.Id,
                Code = coupon.Code,
                DiscountType = coupon.DiscountType,
                DiscountValue = coupon.DiscountValue,
                DiscountAmount = discountAmount,
            };
        }
    }
}