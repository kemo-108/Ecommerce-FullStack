namespace E_commercal_APi.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal MinOrder { get; set; }
        public int Useage { get; set; }
        public int UseageLimit { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; }
        

    }
}
