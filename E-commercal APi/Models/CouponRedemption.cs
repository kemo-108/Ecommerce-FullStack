using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class CouponRedemption
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Coupon))]
        public int CouponId { get; set; }
        public Coupon Coupon { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public DateTime RedeemedAt { get; set; } = DateTime.UtcNow;
    }
}
