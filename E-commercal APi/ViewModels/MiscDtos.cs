using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.ViewModels
{
    public class CouponDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal? MinOrder { get; set; }
        public decimal? MaxDiscount { get; set; }
        public int Usage { get; set; }
        public int? UsageLimit { get; set; }
        public string ExpiryDate { get; set; }
        public string Status { get; set; }
    }

    public class CouponCreateDto
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal MinOrder { get; set; }
        public decimal MaxDiscount { get; set; }
        public int UsageLimit { get; set; }
        [Required] public DateTime ExpiryDate { get; set; }
        public string Status { get; set; } = "active";
    }

    // Sent from the customer's cart when they click "Apply" on the coupon field
    public class ApplyCouponDto
    {
        [Required] public string Code { get; set; }
        public decimal OrderTotal { get; set; }
    }

    // Returned to the cart: whether the code is usable, and how much it saves
    public class CouponApplyResultDto
    {
        public bool Valid { get; set; }
        public string Message { get; set; }
        public int? CouponId { get; set; }
        public string Code { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal DiscountAmount { get; set; }
    }

    public class WishlistItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Rating { get; set; }
        public int Stock { get; set; }
    }

    public class WishlistCreateDto
    {
        public int ProductId { get; set; }
    }

    public class ContactMessageCreateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}