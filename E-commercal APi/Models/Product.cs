using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{

        public class Product
        {
        [Key]
        public int ProductId { get; set; }

        [ForeignKey(nameof(Category))]
        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        [ForeignKey(nameof(Supplier))]
        public int? SupplierId { get; set; }
        public Supplier Supplier { get; set; }

        [Required, MaxLength(150)]
        public string ProductName { get; set; }

        [MaxLength(50)]
        public string Code { get; set; }

        [MaxLength(300)]
        public string ImageUrl { get; set; }

        [Required, Column(TypeName = "decimal(10,2)")]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? OldPrice { get; set; }

        [Range(0, 5)]
        [Column(TypeName = "decimal(2,1)")]
        public decimal? Rating { get; set; }

        [MaxLength(2000)]
        public string Description { get; set; }

        // active | draft | archived
        [MaxLength(20)]
        public string Status { get; set; } = "active";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public ICollection<ProductImage> Images { get; set; }
        public ICollection<Inventory> InventoryRecords { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<Wishlist> WishlistedBy { get; set; }
        public ICollection<Review> Reviews { get; set; }



    }
}
