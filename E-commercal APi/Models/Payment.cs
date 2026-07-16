using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        // cash | visa | wallet | paypal | bank_transfer
        [Required, MaxLength(30)]
        public string Method { get; set; }

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        // pending | completed | failed | refunded
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        [MaxLength(150)]
        public string TransactionRef { get; set; }

        public DateTime? PaidAt { get; set; }
    }
}
