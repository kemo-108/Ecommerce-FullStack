using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.Models
{
    public class Warehouse
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; }

        [MaxLength(250)]
        public string Address { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        // active | inactive
        [MaxLength(20)]
        public string Status { get; set; } = "active";

        public ICollection<Inventory> InventoryRecords { get; set; }
    }
}
