using E_commercal_APi.Models;

using Microsoft.EntityFrameworkCore;
namespace E_commercal_APi.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
        }
        public DbSet<Product> products {  get; set; }
        public DbSet<Addresses> addresses {  get; set; }
        public DbSet<CartItem> cart_items {  get; set; }
        public DbSet<Category> Categories {  get; set; }
        public DbSet<ContactMessage> contact_messages {  get; set; }
        public DbSet<CouponRedemption> coupon_redemptions {  get; set; }
        public DbSet<Coupon> coupons {  get; set; }
        public DbSet<Inventory> inventory {  get; set; }
        public DbSet<Notification> notifications {  get; set; }
        public DbSet<OrderItem> order_items {  get; set; }
        public DbSet<Order> orders {  get; set; }
        public DbSet<PasswordReset> password_resets {  get; set; }
        public DbSet<Payment> payments {  get; set; }
        public DbSet<ProductImage> product_images {  get; set; }
        public DbSet<RefreshToken> refresh_tokens {  get; set; }
        public DbSet<Refund> refunds {  get; set; }
        public DbSet<ReturnItem> return_items {  get; set; }
        public DbSet<Return> returns {  get; set; }
        public DbSet<Review> reviews {  get; set; }
        public DbSet<StockMovement> stock_movements {  get; set; }
        public DbSet<StoreSetting> store_settings{  get; set; }
        public DbSet<Supplier> suppliers {  get; set; }
        public DbSet<User> users {  get; set; }
        public DbSet<Warehouse> warehouses {  get; set; }
        public DbSet<Wishlist> wishlist {  get; set; }






    }
}
