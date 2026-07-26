using E_commercal_APi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [ApiController]
    [Route("api/reports")]
    [Authorize(Roles = "admin")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportsService _reportsService;

        public ReportsController(IReportsService reportsService)
        {
            _reportsService = reportsService;
        }

        [HttpGet("sales")]
        public async Task<IActionResult> GetSales()
        {
            var report = await _reportsService.GetSalesReportAsync();
            return Ok(report);
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            var report = await _reportsService.GetProductsReportAsync();
            return Ok(report);
        }

        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomers()
        {
            var report = await _reportsService.GetCustomersReportAsync();
            return Ok(report);
        }
    }
}