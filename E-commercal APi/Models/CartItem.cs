using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Range(1, int.MaxValue)]
        public int Qty { get; set; } = 1;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
