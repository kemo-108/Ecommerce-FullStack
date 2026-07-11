using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Models
{
    public class Categories
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(300)]
        public string Image { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public bool Featured { get; set; } = false;

        // active | inactive
        [MaxLength(20)]
        public string Status { get; set; } = "active";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<products> products { get; set; }
    }
}
