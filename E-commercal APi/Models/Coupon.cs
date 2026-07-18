using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.Models
{
    [Index(nameof(Code), IsUnique = true)]

    public class Coupon
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal? MinOrder { get; set; }
        public decimal? MaxDiscount { get; set; }
        public int Usage { get; set; }
        public int? UsageLimit { get; set; }
        public DateTime? ExpiryDate { get; set; }
        [Required, MaxLength(20)]
        public string Status { get; set; } = "active";

        public ICollection<Order> Orders { get; set; }
        public ICollection<CouponRedemption> Redemptions { get; set; }
            
    }
}
