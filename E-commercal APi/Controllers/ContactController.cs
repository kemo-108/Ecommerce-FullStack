using E_commercal_APi.Services;
using E_commercal_APi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactMessageCreateDto dto)
        {
            await _contactService.SendMessageAsync(dto);
            return Ok(new { message = "Message sent. We'll get back to you soon." });
        }
    }
}
