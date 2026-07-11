using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class stock_movements
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Inventory))]
        public int InventoryId { get; set; }
        public Inventory Inventory { get; set; }

        // restock | sale | return | adjustment
        [Required, MaxLength(20)]
        public string Type { get; set; }

        [Required]
        public int Quantity { get; set; }

        [MaxLength(250)]
        public string Reason { get; set; }

        [ForeignKey(nameof(CreatedByUser))]
        public int? CreatedBy { get; set; }
        public User CreatedByUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
