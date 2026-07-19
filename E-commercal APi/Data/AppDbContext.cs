using E_commercal_APi.Models;

using Microsoft.EntityFrameworkCore;
namespace E_commercal_APi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<CouponRedemption> CouponRedemptions { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<PasswordReset> PasswordResets { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Refund> Refunds { get; set; }
        public DbSet<ReturnItem> ReturnItems { get; set; }
        public DbSet<Return> Returns { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        public DbSet<StoreSetting> StoreSettings { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CouponRedemption>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(cr => cr.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
