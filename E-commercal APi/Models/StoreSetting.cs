using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.Models
{
    public class StoreSetting
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Key { get; set; }

        [MaxLength(1000)]
        public string Value { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
