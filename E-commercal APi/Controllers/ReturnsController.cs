using System.Security.Claims;
using E_commercal_APi.Services;
using E_commercal_APi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/returns")]
    [Authorize]
    public class ReturnsController : ControllerBase
    {
        private readonly IReturnService _returnService;

        public ReturnsController(IReturnService returnService)
        {
            _returnService = returnService;
        }

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAll()
        {
            var returns = await _returnService.GetAllAsync();
            return Ok(returns);
        }

        [HttpGet("my-returns")]
        public async Task<IActionResult> GetMyReturns()
        {
            var returns = await _returnService.GetMyReturnsAsync(UserId);
            return Ok(returns);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReturnCreateDto dto)
        {
            try
            {
                var ret = await _returnService.CreateAsync(UserId, dto);
                return Ok(ret);
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
        public async Task<IActionResult> UpdateStatus(int id, ReturnStatusUpdateDto dto)
        {
            try
            {
                var ret = await _returnService.UpdateStatusAsync(id, dto);
                return Ok(ret);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
