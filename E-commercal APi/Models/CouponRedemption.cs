namespace E_commercal_APi.Models
{
    public class CouponRedemption
    {
        public int Id { get; set; }
        public int CouponId { get; set; }
        public int UserId { get; set; }
        public int OrederId { get; set; }
        public DateTime RedeemAt { get; set; }
    }
}
