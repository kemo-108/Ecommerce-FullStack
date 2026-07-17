using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _db;

        public OrderService(AppDbContext db)
        {
            _db = db;
        }

        private static OrderDto ToDto(Order o) => new()
        {
            OrderId = o.OrderId,
            CustomerName = o.CustomerName,
            CustomerEmail = o.CustomerEmail,
            CustomerImage = o.CustomerImage,
            Subtotal = o.Subtotal,
            Tax = o.Tax,
            Shipping = o.Shipping,
            Total = o.Total,
            PaymentStatus = o.PaymentStatus,
            Status = o.Status,
            Address = o.AddressSnapshot,
            Notes = o.Notes,
            OrderDate = o.OrderDate.ToString("dd MMM yyyy"),
            Items = o.Items?.Select(i => new OrderItemInputDto
            {
                ProductId = i.ProductId,
                ProductName = i.ProductName,
                Price = i.Price,
                Quantity = i.Quantity,
            }).ToList() ?? new(),
        };

        public async Task<OrderDto> PlaceOrderAsync(int userId, PlaceOrderDto dto)
        {
            var order = new Order
            {
                UserId = userId,
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                Subtotal = dto.Subtotal,
                Shipping = dto.Shipping,
                Tax = 0,
                Total = dto.Total,
                PaymentStatus = "pending",
                Status = "pending",
                AddressSnapshot = dto.Address,
                OrderDate = DateTime.UtcNow,
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity,
                }).ToList(),
            };

            _db.Orders.Add(order);

            // Clear the user's cart now that the order has been placed.
            var cartItems = _db.CartItems.Where(c => c.UserId == userId);
            _db.CartItems.RemoveRange(cartItems);

            await _db.SaveChangesAsync();

            return ToDto(order);
        }

        public async Task<List<OrderDto>> GetMyOrdersAsync(int userId)
        {
            var orders = await _db.Orders
                .Include(o => o.Items)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return orders.Select(ToDto).ToList();
        }

        public async Task<OrderDto?> GetByIdAsync(int orderId)
        {
            var order = await _db.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            return order == null ? null : ToDto(order);
        }

        public async Task<List<OrderDto>> GetAllAsync()
        {
            var orders = await _db.Orders
                .Include(o => o.Items)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return orders.Select(ToDto).ToList();
        }

        public async Task<OrderDto> AdminCreateOrderAsync(AdminCreateOrderDto dto)
        {
            // Walk-in / manual order created by an admin. We look up (or reuse)
            // a guest user record by email so the order still has a valid UserId.
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.CustomerEmail);

            if (user == null)
            {
                user = new User
                {
                    Name = dto.CustomerName,
                    Email = dto.CustomerEmail,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                    Role = "customer",
                    Status = "active",
                    Joined = DateTime.UtcNow,
                };
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
            }

            var order = new Order
            {
                UserId = user.Id,
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                Subtotal = dto.Total,
                Shipping = 0,
                Tax = 0,
                Total = dto.Total,
                PaymentStatus = dto.PaymentStatus,
                Status = dto.Status,
                OrderDate = DateTime.UtcNow,
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity,
                }).ToList(),
            };

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            return ToDto(order);
        }

        public async Task UpdateStatusAsync(int orderId, string status)
        {
            var order = await _db.Orders.FindAsync(orderId)
                ?? throw new KeyNotFoundException("Order not found.");

            order.Status = status;
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int orderId)
        {
            var order = await _db.Orders.FindAsync(orderId)
                ?? throw new KeyNotFoundException("Order not found.");

            _db.Orders.Remove(order);
            await _db.SaveChangesAsync();
        }
    }
}
