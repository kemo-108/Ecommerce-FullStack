using System.Security.Claims;
using E_commercal_APi.Services;
using E_commercal_APi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Customer checkout
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PlaceOrder(PlaceOrderDto dto)
        {
            var order = await _orderService.PlaceOrderAsync(UserId, dto);
            return Ok(order);
        }

        // Customer's own order history
        [HttpGet("my-orders")]
        [Authorize]
        public async Task<IActionResult> GetMyOrders()
        {
            var orders = await _orderService.GetMyOrdersAsync(UserId);
            return Ok(orders);
        }

        // Admin: every order in the system
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _orderService.GetAllAsync();
            return Ok(orders);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _orderService.GetByIdAsync(id);
            return order == null ? NotFound(new { message = "Order not found." }) : Ok(order);
        }

        // Admin: manually create an order for a walk-in customer
        [HttpPost("admin")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AdminCreate(AdminCreateOrderDto dto)
        {
            var order = await _orderService.AdminCreateOrderAsync(dto);
            return Ok(order);
        }

        [HttpPatch("{id:int}/status")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateOrderStatusDto dto)
        {
            try
            {
                await _orderService.UpdateStatusAsync(id, dto.Status);
                return Ok(new { message = "Order status updated." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _orderService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
