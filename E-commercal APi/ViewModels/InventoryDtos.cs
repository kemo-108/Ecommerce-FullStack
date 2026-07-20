using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.ViewModels
{
    public class InventoryDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public string Warehouse { get; set; }
        public string Sku { get; set; }
        public string Barcode { get; set; }
        public int Stock { get; set; }
        public int MinStock { get; set; }
        public DateTime LastUpdated { get; set; }
    }

    public class InventoryUpdateDto
    {
        public string Sku { get; set; }
        public string Barcode { get; set; }
        public int MinStock { get; set; }
    }

    public class RestockDto
    {
        [Required] public int Quantity { get; set; }
        public string Reason { get; set; }
    }

    public class StockMovementDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }
        public string Reason { get; set; }
        public string CreatedByName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
