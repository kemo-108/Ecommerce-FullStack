using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly data.AppDbContext _db;
        public CartController(data.AppDbContext db)
        {
            _db = db;
        }
        [HttpPost]
        public IActionResult AddToCart(Models.Cart cart)
        {
            var Product = _db.Products.Find(cart.ProductId);
            if (Product == null)
            {
                return NotFound("Product Not Found");

            }
            else
            {
                var existingCartItem = _db.Carts.FirstOrDefault(c => c.ProductId == cart.ProductId && c.UserId == cart.UserId);
                if (existingCartItem != null)
                {
                    existingCartItem.Qty += cart.Qty;

                }
                else
                {
                    _db.Carts.Add(cart);
                }
                    _db.SaveChanges();
                    return Ok();
            }
        }
        [HttpGet]
        public IActionResult GetCart()
        {
            var cartItems = _db.Carts.Include(c => c.product).ToList();
            return Ok(cartItems);
        }
        [HttpDelete("{id}")]
        public IActionResult RemoveFromCart(int id)
        {
            var Item = _db.Carts.Find(id);
            if (Item == null)
            {
                return NotFound("Cart Item Not Found");
            }
            _db.Carts.Remove(Item);
            _db.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCartItem(int id, Models.Cart cart)
        {
            var Item = _db.Carts.Find(id);
            if (Item == null)
            {
                return NotFound("Cart Item Not Found");
            }
            Item.Qty = cart.Qty;
            _db.SaveChanges();
            return Ok(Item);
        }

    }
}
