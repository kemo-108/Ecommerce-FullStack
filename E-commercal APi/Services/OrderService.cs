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
            Discount = o.Discount,
            Total = o.Total,
            PaymentStatus = o.PaymentStatus,

            PaymentMethod = o.PaymentMethod,
            Status = o.Status,
            Address = o.AddressSnapshot,
            Notes = o.Notes,
            OrderDate = o.OrderDate.ToString("dd MMM yyyy"),
            Items = o.Items?.Select(i => new OrderItemInputDto
            {
                ProductId = i.ProductId,
                ProductName = i.ProductName,
                ImageUrl = i.ImageUrl,
                Price = i.Price,
                Quantity = i.Quantity,
                ColorName = i.ColorName,
                ColorHexCode = i.ColorHexCode,
            }).ToList() ?? new(),
        };

        public async Task<OrderDto> PlaceOrderAsync(int userId, PlaceOrderDto dto)
        {
            var user = await _db.Users.FindAsync(userId);

            // Re-check the coupon here instead of trusting a discount amount
            // sent from the client — codes can expire, hit their usage limit,
            // or stop meeting MinOrder between "Apply" on the cart and checkout.
            decimal discount = 0;
            Coupon coupon = null;

            if (!string.IsNullOrWhiteSpace(dto.CouponCode))
            {
                var code = dto.CouponCode.Trim();
                coupon = await _db.Coupons
                    .FirstOrDefaultAsync(c => c.Code.ToLower() == code.ToLower());

                var isUsable = coupon != null
                    && string.Equals(coupon.Status, "active", StringComparison.OrdinalIgnoreCase)
                    && coupon.ExpiryDate.Date >= DateTime.UtcNow.Date
                    && (coupon.UseageLimit <= 0 || coupon.Useage < coupon.UseageLimit)
                    && (coupon.MinOrder <= 0 || dto.Subtotal >= coupon.MinOrder);

                if (isUsable)
                {
                    discount = string.Equals(coupon.DiscountType, "Percentage", StringComparison.OrdinalIgnoreCase)
                        ? dto.Subtotal * (coupon.DiscountValue / 100m)
                        : coupon.DiscountValue;

                    if (coupon.MaxDiscount > 0 && discount > coupon.MaxDiscount)
                    {
                        discount = coupon.MaxDiscount;
                    }

                    if (discount > dto.Subtotal)
                    {
                        discount = dto.Subtotal;
                    }

                    discount = Math.Round(discount, 2);
                }
                else
                {
                    // Coupon stopped being valid by the time the order was placed —
                    // silently drop it rather than failing the whole checkout.
                    coupon = null;
                }
            }

            var total = dto.Subtotal + dto.Shipping - discount;

            var order = new Order
            {
                UserId = userId,
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                CustomerImage = user?.Avatar ?? "",
                Subtotal = dto.Subtotal,
                Shipping = dto.Shipping,
                Tax = 0,
                Discount = discount,
                CouponId = coupon?.Id,
                Total = total,
                PaymentStatus = "pending",
                PaymentMethod = string.IsNullOrWhiteSpace(dto.PaymentMethod)
                                ? "Cash On Delivery"
                                : dto.PaymentMethod,
                Status = "pending",
                AddressSnapshot = dto.Address,
                Notes = "",
                OrderDate = DateTime.UtcNow,
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    ImageUrl = i.ImageUrl,
                    Price = i.Price,
                    Quantity = i.Quantity,
                    ColorName = i.ColorName,
                    ColorHexCode = i.ColorHexCode,
                }).ToList(),
            };

            _db.Orders.Add(order);

            if (coupon != null)
            {
                coupon.Useage += 1;
            }

            // Clear the user's cart now that the order has been placed.
            var cartItems = _db.CartItems.Where(c => c.UserId == userId);
            _db.CartItems.RemoveRange(cartItems);

            await _db.SaveChangesAsync();

            if (coupon != null)
            {
                _db.CouponRedemptions.Add(new CouponRedemption
                {
                    CouponId = coupon.Id,
                    UserId = userId,
                    OrederId = order.OrderId,
                    RedeemAt = DateTime.UtcNow,
                });
                await _db.SaveChangesAsync();
            }

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
                PaymentMethod = "Cash On Delivery",
                Status = dto.Status,
                OrderDate = DateTime.UtcNow,
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity,
                    ColorName = i.ColorName,
                    ColorHexCode = i.ColorHexCode,
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

        public async Task DeleteMyOrderAsync(int userId, int orderId)
        {
            var order = await _db.Orders
                .FirstOrDefaultAsync(o => o.OrderId == orderId && o.UserId == userId)
                ?? throw new KeyNotFoundException("Order not found.");

            _db.Orders.Remove(order);
            await _db.SaveChangesAsync();
        }
    }
}