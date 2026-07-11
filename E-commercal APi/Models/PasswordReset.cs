using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commercal_APi.Models
{
    public class PasswordReset
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required, MaxLength(500)]
        public string Token { get; set; }

        public DateTime ExpiresAt { get; set; }

        public bool Used { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
