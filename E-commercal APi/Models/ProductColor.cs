using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class ProductColor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required, MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(20)]
        public string? HexCode { get; set; }

        [MaxLength(300)]
        public string? ImageUrl { get; set; }

        public int SortOrder { get; set; } = 0;
    }
}