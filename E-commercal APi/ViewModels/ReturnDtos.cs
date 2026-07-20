using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.ViewModels
{
    public class ReturnItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }

    public class ReturnDto
    {
        public int ReturnId { get; set; }
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public int Qty { get; set; }
        public decimal Total { get; set; }
        public string Reason { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public List<ReturnItemDto> Items { get; set; } = new();
    }

    public class ReturnItemInputDto
    {
        [Required] public int ProductId { get; set; }
        [Required] public int Quantity { get; set; }
    }

    public class ReturnCreateDto
    {
        [Required] public int OrderId { get; set; }
        public decimal Total { get; set; }
        public string Reason { get; set; }
        public List<ReturnItemInputDto> Items { get; set; } = new();
    }

    public class ReturnStatusUpdateDto
    {
        // approved | rejected | completed
        [Required] public string Status { get; set; }
    }
}
