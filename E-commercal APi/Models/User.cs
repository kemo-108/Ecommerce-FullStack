using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(150), EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(300)]
        public string Avatar { get; set; }

        // customer | admin
        [Required, MaxLength(20)]
        public string Role { get; set; } = "customer";

        // active | inactive | banned
        [Required, MaxLength(20)]
        public string Status { get; set; } = "active";

        public bool EmailVerified { get; set; } = false;

        public DateTime Joined { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
        public ICollection<Address> Addresses { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<Wishlist> WishlistItems { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }
}
