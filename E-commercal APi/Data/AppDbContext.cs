using E_commercal_APi.Models;

using Microsoft.EntityFrameworkCore;
namespace E_commercal_APi.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
        }
        public DbSet<products> products {  get; set; }
        public DbSet<addresses> addresses {  get; set; }
        public DbSet<cart_items> cart_items {  get; set; }
        public DbSet<Categories> Categories {  get; set; }
        public DbSet<contact_messages> contact_messages {  get; set; }
        public DbSet<coupon_redemptions> coupon_redemptions {  get; set; }
        public DbSet<coupons> coupons {  get; set; }
        public DbSet<inventory> inventory {  get; set; }
        public DbSet<notifications> notifications {  get; set; }
        public DbSet<order_items> order_items {  get; set; }
        public DbSet<orders> orders {  get; set; }
        public DbSet<password_resets> password_resets {  get; set; }
        public DbSet<payments> payments {  get; set; }
        public DbSet<product_images> product_images {  get; set; }
        public DbSet<refresh_tokens> refresh_tokens {  get; set; }
        public DbSet<refunds> refunds {  get; set; }
        public DbSet<return_items> return_items {  get; set; }
        public DbSet<returns> returns {  get; set; }
        public DbSet<reviews> reviews {  get; set; }
        public DbSet<stock_movements> stock_movements {  get; set; }
        public DbSet<store_settings> store_settings{  get; set; }
        public DbSet<suppliers> suppliers {  get; set; }
        public DbSet<users> users {  get; set; }
        public DbSet<warehouses> warehouses {  get; set; }
        public DbSet<wishlist> wishlist {  get; set; }






    }
}
