namespace E_commercal_APi.ViewModels
{
    public class CategoryVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public bool Featured { get; set; }
        public string Status { get; set; }
        public int ProductsCount { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CategoryCreateVM
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Featured { get; set; } = false;
        public string Status { get; set; } = "active";
        public IFormFile? Image { get; set; }
    }

    public class CategoryUpdateVM
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Featured { get; set; }
        public string Status { get; set; }

        // أضف السطر ده
        public IFormFile? Image { get; set; }
    }
}