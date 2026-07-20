using E_commercal_APi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/settings")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        // Public read: the storefront may need some of these (currency, tax rate, etc).
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var settings = await _settingsService.GetAllAsync();
            return Ok(settings);
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Update([FromBody] Dictionary<string, string> settings)
        {
            var updated = await _settingsService.UpdateAsync(settings);
            return Ok(updated);
        }
    }
}
