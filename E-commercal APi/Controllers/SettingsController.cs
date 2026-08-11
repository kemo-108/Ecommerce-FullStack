using E_commercal_APi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/settings")]
    // Every current usage of GetAll is inside the admin dashboard - nothing in
    // the storefront reads it. It used to have no [Authorize] at all though,
    // so anyone could read every store setting without logging in.
    [Authorize(Roles = "admin")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var settings = await _settingsService.GetAllAsync();
            return Ok(settings);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Dictionary<string, string> settings)
        {
            var updated = await _settingsService.UpdateAsync(settings);
            return Ok(updated);
        }
    }
}
