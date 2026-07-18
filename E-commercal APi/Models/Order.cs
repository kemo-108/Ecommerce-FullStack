using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class Order
    {

        [Key]
        public int OrderId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(Address))]
        public int? AddressId { get; set; }
        public Address Address { get; set; }

        [ForeignKey(nameof(Coupon))]
        public int? CouponId { get; set; }
        public Coupon Coupon { get; set; }

        [Required, MaxLength(100)]
        public string CustomerName { get; set; }

        [Required, MaxLength(150), EmailAddress]
        public string CustomerEmail { get; set; }

        [MaxLength(300)]
        public string CustomerImage { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Tax { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Shipping { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Discount { get; set; } = 0;

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }

        // paid | pending | failed
        [Required, MaxLength(20)]
        public string PaymentStatus { get; set; } = "pending";

        // pending | processing | shipped | delivered | cancelled
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        [MaxLength(300)]
        public string AddressSnapshot { get; set; }

        [MaxLength(500)]
        public string Notes { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public ICollection<OrderItem> Items { get; set; }
        public Payment Payment { get; set; }
        public ICollection<Refund> Refunds { get; set; }
        public ICollection<Return> Returns { get; set; }

    }
}
