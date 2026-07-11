using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class ReturnItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Return))]
        public int ReturnId { get; set; }
        public Return Return { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

    }
}
