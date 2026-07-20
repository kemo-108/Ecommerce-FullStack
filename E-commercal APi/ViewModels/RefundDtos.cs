using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.ViewModels
{
    public class RefundDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAvatar { get; set; }
        public decimal Amount { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public DateTime? ProcessedAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class RefundCreateDto
    {
        [Required] public int OrderId { get; set; }
        [Required] public decimal Amount { get; set; }
        public string Reason { get; set; }
    }

    public class RefundStatusUpdateDto
    {
        // approved | rejected
        [Required] public string Status { get; set; }
    }
}
