// =========================================================
// Art Cornar — EF Core Models (Data Annotations)
// =========================================================
// ملحوظة: كل الكلاسات دي جاهزة تتحط في مجلد Models في مشروع
// ASP.NET Core بتاعك. كل كلاس فيه الـ Data Annotations اللي
// بتعبر عن القيود (Required, MaxLength, ForeignKey, Unique...)
// المتوافقة مع الـ ERD والـ DBML اللي عملناهم قبل كده.
// =========================================================

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Models
{
    // ================= AUTH & USERS =================

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

        // Navigation
        public ICollection<Address> Addresses { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<Wishlist> WishlistItems { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }

    public class RefreshToken
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

        public bool Revoked { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

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

    public class Address
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

    // ================= CATALOG =================

    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(300)]
        public string Image { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public bool Featured { get; set; } = false;

        // active | inactive
        [MaxLength(20)]
        public string Status { get; set; } = "active";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Product> Products { get; set; }
    }

    public class Supplier
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; }

        [MaxLength(150), EmailAddress]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(250)]
        public string Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Product> Products { get; set; }
    }

    [Index(nameof(Code), IsUnique = true)]
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [ForeignKey(nameof(Category))]
        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        [ForeignKey(nameof(Supplier))]
        public int? SupplierId { get; set; }
        public Supplier Supplier { get; set; }

        [Required, MaxLength(150)]
        public string ProductName { get; set; }

        [MaxLength(100)]
        public string Brand { get; set; }

        [MaxLength(50)]
        public string Code { get; set; }

        [MaxLength(300)]
        public string ImageUrl { get; set; }

        [Required, Column(TypeName = "decimal(10,2)")]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? OldPrice { get; set; }

        [Range(0, 5)]
        [Column(TypeName = "decimal(2,1)")]
        public decimal? Rating { get; set; }

        [MaxLength(2000)]
        public string Description { get; set; }

        // active | draft | archived
        [MaxLength(20)]
        public string Status { get; set; } = "active";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public ICollection<ProductImage> Images { get; set; }
        public ICollection<Inventory> InventoryRecords { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<Wishlist> WishlistedBy { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }

    public class ProductImage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required, MaxLength(300)]
        public string ImageUrl { get; set; }

        public int SortOrder { get; set; } = 0;
    }

    // ================= INVENTORY / WAREHOUSE =================

    public class Warehouse
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; }

        [MaxLength(250)]
        public string Address { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        // active | inactive
        [MaxLength(20)]
        public string Status { get; set; } = "active";

        public ICollection<Inventory> InventoryRecords { get; set; }
    }

    [Index(nameof(ProductId), nameof(WarehouseId), IsUnique = true)]
    [Index(nameof(Sku), IsUnique = true)]
    public class Inventory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required]
        [ForeignKey(nameof(Warehouse))]
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }

        [Required, MaxLength(50)]
        public string Sku { get; set; }

        [MaxLength(50)]
        public string Barcode { get; set; }

        [Range(0, int.MaxValue)]
        public int Stock { get; set; } = 0;

        [Range(0, int.MaxValue)]
        public int MinStock { get; set; } = 0;

        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        public ICollection<StockMovement> Movements { get; set; }
    }

    public class StockMovement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Inventory))]
        public int InventoryId { get; set; }
        public Inventory Inventory { get; set; }

        // restock | sale | return | adjustment
        [Required, MaxLength(20)]
        public string Type { get; set; }

        [Required]
        public int Quantity { get; set; }

        [MaxLength(250)]
        public string Reason { get; set; }

        [ForeignKey(nameof(CreatedByUser))]
        public int? CreatedBy { get; set; }
        public User CreatedByUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ================= CART =================

    [Index(nameof(UserId), nameof(ProductId), IsUnique = true)]
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Range(1, int.MaxValue)]
        public int Qty { get; set; } = 1;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ================= ORDERS =================

    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(Address))]
        public int? AddressId { get; set; }
        public Address Address { get; set; }

        [ForeignKey(nameof(Coupon))]
        public int? CouponId { get; set; }
        public Coupon Coupon { get; set; }

        [Required, MaxLength(100)]
        public string CustomerName { get; set; }

        [Required, MaxLength(150), EmailAddress]
        public string CustomerEmail { get; set; }

        [MaxLength(300)]
        public string CustomerImage { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Tax { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Shipping { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Discount { get; set; } = 0;

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }

        // paid | pending | failed
        [Required, MaxLength(20)]
        public string PaymentStatus { get; set; } = "pending";

        // pending | processing | shipped | delivered | cancelled
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        [MaxLength(300)]
        public string AddressSnapshot { get; set; }

        [MaxLength(500)]
        public string Notes { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<OrderItem> Items { get; set; }
        public Payment Payment { get; set; }
        public ICollection<Refund> Refunds { get; set; }
        public ICollection<Return> Returns { get; set; }
    }

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

    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        // cash | visa | wallet | paypal | bank_transfer
        [Required, MaxLength(30)]
        public string Method { get; set; }

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        // pending | completed | failed | refunded
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        [MaxLength(150)]
        public string TransactionRef { get; set; }

        public DateTime? PaidAt { get; set; }
    }

    // ================= WISHLIST & REVIEWS =================

    [Index(nameof(UserId), nameof(ProductId), IsUnique = true)]
    public class Wishlist
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [MaxLength(100)]
        public string Customer { get; set; }

        [Required, Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(1000)]
        public string Comment { get; set; }

        // published | pending | hidden
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ================= COUPONS =================

    [Index(nameof(Code), IsUnique = true)]
    public class Coupon
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Code { get; set; }

        [MaxLength(250)]
        public string Description { get; set; }

        // percentage | fixed
        [Required, MaxLength(20)]
        public string DiscountType { get; set; }

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal DiscountValue { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? MinOrder { get; set; }

        public int Usage { get; set; } = 0;

        public int? UsageLimit { get; set; }

        public DateTime? ExpiryDate { get; set; }

        // active | expired | disabled
        [Required, MaxLength(20)]
        public string Status { get; set; } = "active";

        public ICollection<Order> Orders { get; set; }
        public ICollection<CouponRedemption> Redemptions { get; set; }
    }

    public class CouponRedemption
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Coupon))]
        public int CouponId { get; set; }
        public Coupon Coupon { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public DateTime RedeemedAt { get; set; } = DateTime.UtcNow;
    }

    // ================= REFUNDS & RETURNS =================

    public class Refund
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        [MaxLength(250)]
        public string Reason { get; set; }

        // pending | approved | rejected
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        public DateTime? ProcessedAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Return
    {
        [Key]
        public int ReturnId { get; set; }

        [Required]
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Range(1, int.MaxValue)]
        public int Qty { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }

        [MaxLength(250)]
        public string Reason { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        // pending | approved | rejected | completed
        [Required, MaxLength(20)]
        public string Status { get; set; } = "pending";

        public ICollection<ReturnItem> Items { get; set; }
    }

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

    // ================= NOTIFICATIONS & MESSAGES =================

    public class Notification
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required, MaxLength(150)]
        public string Title { get; set; }

        [MaxLength(500)]
        public string Message { get; set; }

        // order | system | promo | stock
        [MaxLength(20)]
        public string Type { get; set; }

        public bool IsRead { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ContactMessage
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(150), EmailAddress]
        public string Email { get; set; }

        [MaxLength(200)]
        public string Subject { get; set; }

        [Required, MaxLength(2000)]
        public string Message { get; set; }

        // new | read | replied
        [Required, MaxLength(20)]
        public string Status { get; set; } = "new";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ================= STORE SETTINGS =================

    [Index(nameof(Key), IsUnique = true)]
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
