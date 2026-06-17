using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly data.AppDbContext _db;
        public ContactController(data.AppDbContext db)
        {
            _db = db;
        }
        [HttpPost]
        public IActionResult SendMessage(Models.Contact contact)
        {
            if (contact == null)
                return BadRequest();
            _db.Contacts.Add(contact);
            _db.SaveChanges();
            return Ok(new {message= "Message sent successfully"});
        }
        [HttpDelete("id")]
        public IActionResult DeletMessage(int id)
        {
            var contact =_db.Contacts.Find(id);
            if (contact == null)
                return NotFound();
            _db.Contacts.Remove(contact);
            _db.SaveChanges();
            return Ok(new { message = "message is deleted" });
        }
    }
}
