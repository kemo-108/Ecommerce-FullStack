using E_commercal_APi.Services;
using E_commercal_APi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_commercal_APi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var Product = await _productService.GetProductByIdAsync(id);
            if (Product == null)
                return NotFound();
            return Ok(Product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] ProductCreateVM dto)
        {
            var created = await _productService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetProductById), new { id = created.ProductId }, created);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductUpdateVM dto)
        {
            var updated = await _productService.UpdateAsync(id, dto);

            if (!updated)
                return NotFound(new { message = $"Product with id {id} was not found." });

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deleted = await _productService.DeleteAsync(id);

            if (!deleted)
                return NotFound(new { message = $"Product with id {id} was not found." });

            return NoContent();
        }
    }


}
