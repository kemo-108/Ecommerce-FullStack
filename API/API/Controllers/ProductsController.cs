using Microsoft.AspNetCore.Mvc;
using API.data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            if (product==null)
            {
               return BadRequest();
            }
            _db.Products.Add(product);
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }
            var existing = _db.Products.Find(id);
            if (existing==null)
            {
                return NotFound();
            }
            existing.ProductName = product.ProductName;
            existing.Price = product.Price;
            _db.SaveChanges();
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _db.Products.Remove(product);
            _db.SaveChanges();
            return NoContent();
        }
        [HttpGet]
        public IActionResult GetProducts(int page =1,int pageSize=12)
        {
            var totalProducts = _db.Products.Count();
            var products = _db.Products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return Ok(new
            {
                Product = products,
                TotalProducts = totalProducts
            });
        }
    }
}