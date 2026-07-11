using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class Addresses
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        // home | work | other
        [MaxLength(20)]
        public string Type { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        [Required, MaxLength(250)]
        public string AddressLine { get; set; }

        [MaxLength(100)]
        public string City { get; set; }

        [MaxLength(100)]
        public string Governorate { get; set; }

        [MaxLength(100)]
        public string Country { get; set; }

        [MaxLength(20)]
        public string PostalCode { get; set; }

        public bool Default { get; set; } = false;







    }
}
