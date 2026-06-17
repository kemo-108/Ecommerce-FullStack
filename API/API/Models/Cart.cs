using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace API.Models
{
    public class Cart
    {
        [Key]
        public int CartItemId { get; set; }

        public int ProductId { get; set; }
        public string UserId { get; set; } =String.Empty;

        [JsonIgnore]
        public Product? product { get; set; }

        public int Qty { get; set; }


    }
}
