using System.Security.Claims;
using E_commercal_APi.Services;
using E_commercal_APi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/refunds")]
    [Authorize]
    public class RefundsController : ControllerBase
    {
        private readonly IRefundService _refundService;

        public RefundsController(IRefundService refundService)
        {
            _refundService = refundService;
        }

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAll()
        {
            var refunds = await _refundService.GetAllAsync();
            return Ok(refunds);
        }

        [HttpGet("my-refunds")]
        public async Task<IActionResult> GetMyRefunds()
        {
            var refunds = await _refundService.GetMyRefundsAsync(UserId);
            return Ok(refunds);
        }

        [HttpPost]
        public async Task<IActionResult> Create(RefundCreateDto dto)
        {
            try
            {
                var refund = await _refundService.CreateAsync(UserId, dto);
                return Ok(refund);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        [HttpPatch("{id}/status")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateStatus(int id, RefundStatusUpdateDto dto)
        {
            try
            {
                var refund = await _refundService.UpdateStatusAsync(id, dto);
                return Ok(refund);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
