using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public class ContactService : IContactService
    {
        private readonly AppDbContext _db;

        public ContactService(AppDbContext db)
        {
            _db = db;
        }

        public async Task SendMessageAsync(ContactMessageCreateDto dto)
        {
            _db.ContactMessages.Add(new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Subject = dto.Subject,
                Message = dto.Message,
                Status = "new",
                CreatedAt = DateTime.UtcNow,
            });

            await _db.SaveChangesAsync();
        }
    }
}
