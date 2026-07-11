using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // snapshot اسم المنتج وقت الطلب، عشان لو اتغير اسم المنتج بعدين
        [MaxLength(150)]
        public string ProductName { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        // snapshot السعر وقت الطلب
        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

    }
}
