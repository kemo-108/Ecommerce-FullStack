using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.ViewModels
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Phone { get; set; }
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string Governorate { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public bool Default { get; set; }
    }

    public class AddressCreateDto
    {
        [Required] public string Name { get; set; }
        public string Type { get; set; } = "home";
        public string Phone { get; set; }
        [Required] public string AddressLine { get; set; }
        public string City { get; set; }
        public string Governorate { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public bool Default { get; set; }
    }
}