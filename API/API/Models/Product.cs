using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Color { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
        public int DepartmentId { get; set; }
        public string ImageUrl { get; set; }
        public Department Department { get; set; }
    }
}
