using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class Return
    {
        [Key]
        public int ReturnId { get; set; }

        [Required]
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Range(1, int.MaxValue)]
        public int Qty { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }

        [MaxLength(250)]
        public string Reason { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        // pending | approved | rejected | completed
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        public ICollection<ReturnItem> Items { get; set; }
    }
}
