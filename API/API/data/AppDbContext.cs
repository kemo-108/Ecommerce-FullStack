
using Microsoft.EntityFrameworkCore;

namespace API.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Models.Department> Departments { get; set; }
        public DbSet<Models.Product> Products { get; set; }
        public DbSet<Models.Contact> Contacts { get; set; }
        public DbSet<Models.Cart> Carts { get; set; } 
    }
}
