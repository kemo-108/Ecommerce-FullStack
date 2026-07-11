using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required]
        [ForeignKey(nameof(Warehouse))]
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }

        [Required, MaxLength(50)]
        public string Sku { get; set; }

        [MaxLength(50)]
        public string Barcode { get; set; }

        [Range(0, int.MaxValue)]
        public int Stock { get; set; } = 0;

        [Range(0, int.MaxValue)]
        public int MinStock { get; set; } = 0;

        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        public ICollection<StockMovement> Movements { get; set; }
    }
}
