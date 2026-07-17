using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IContactService
    {
        Task SendMessageAsync(ContactMessageCreateDto dto);
    }
}
