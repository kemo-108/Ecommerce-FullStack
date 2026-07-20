using System.Security.Claims;
using E_commercal_APi.Services;
using E_commercal_APi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/inventory")]
    [Authorize(Roles = "admin")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var records = await _inventoryService.GetAllAsync();
            return Ok(records);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, InventoryUpdateDto dto)
        {
            try
            {
                var updated = await _inventoryService.UpdateAsync(id, dto);
                return Ok(updated);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost("{id}/restock")]
        public async Task<IActionResult> Restock(int id, RestockDto dto)
        {
            try
            {
                var updated = await _inventoryService.RestockAsync(id, UserId, dto);
                return Ok(updated);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpGet("{id}/movements")]
        public async Task<IActionResult> GetMovements(int id)
        {
            var movements = await _inventoryService.GetMovementsAsync(id);
            return Ok(movements);
        }
    }
}
