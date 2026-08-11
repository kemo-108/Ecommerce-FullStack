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
                SizeName = i.SizeName,
            }).ToList() ?? new(),
        };

        // بيخصم الكمية من مخزن (أو أكتر) للمنتج، بيبدأ بالمخزن اللي فيه أكبر رصيد
        private async Task DeductStockAsync(int productId, int quantity)
        {
            var records = await _db.Inventory
                .Where(i => i.ProductId == productId && i.Stock > 0)
                .OrderByDescending(i => i.Stock)
                .ToListAsync();

            var remaining = quantity;
            foreach (var record in records)
            {
                if (remaining <= 0) break;

                var deduct = Math.Min(record.Stock, remaining);
                record.Stock -= deduct;
                record.LastUpdated = DateTime.UtcNow;
                remaining -= deduct;
            }   
        }

        // عكس DeductStockAsync - بيرجع الكمية للمخزن لما أوردر يتلغي أو
        // مرتجع يتوافق عليه. بيحط الكمية كلها في أول سجل مخزون للمنتج (أو
        // بينشئ واحد لو مفيش، حالة نادرة جدًا لأن المنتج أصلاً كان معاه
        // مخزون وقت البيع).
        private async Task RestoreStockAsync(int productId, int quantity)
        {
            if (quantity <= 0) return;

            var record = await _db.Inventory.FirstOrDefaultAsync(i => i.ProductId == productId);

            if (record != null)
            {
                record.Stock += quantity;
                record.LastUpdated = DateTime.UtcNow;
                return;
            }

            // No inventory row at all (shouldn't normally happen - the sale
            // that's being reversed had to deduct from somewhere). Fall back
            // to creating one so the stock isn't silently lost.
            var defaultWarehouse = await _db.Warehouses.FirstOrDefaultAsync();
            if (defaultWarehouse == null)
            {
                defaultWarehouse = new Warehouse { Name = "Main Warehouse", Address = "N/A", Phone = "N/A", Status = "active" };
                _db.Warehouses.Add(defaultWarehouse);
                await _db.SaveChangesAsync();
            }

            _db.Inventory.Add(new Inventory
            {
                ProductId = productId,
                WarehouseId = defaultWarehouse.Id,
                Sku = $"SKU-{productId}",
                Barcode = "N/A",
                Stock = quantity,
                MinStock = 5,
                LastUpdated = DateTime.UtcNow,
            });
        }

        // بيتحقق إن كل سطر في الأوردر لسه متوفر بنفس الكمية المطلوبة
        private async Task EnsureStockAvailableAsync(IEnumerable<(int ProductId, string ProductName, int Quantity)> lines)
        {
            foreach (var line in lines)
            {
                var available = await _db.Inventory
                    .Where(i => i.ProductId == line.ProductId)
                    .SumAsync(i => (int?)i.Stock) ?? 0;

                if (line.Quantity > available)
                    throw new InvalidOperationException(
                        $"'{line.ProductName}' only has {available} unit(s) left in stock.");
            }
        }

        public async Task<OrderDto> PlaceOrderAsync(int userId, PlaceOrderDto dto)
        {
            var user = await _db.Users.FindAsync(userId);

            // تحقّق إن كل منتج لسه فيه رصيد كافي قبل ما نبدأ ننشئ الأوردر —
            // ممكن الكمية تتغير بين وقت ما العميل حط المنتج في السلة ولحظة الدفع.
            await EnsureStockAvailableAsync(
                dto.Items.Select(i => (i.ProductId, i.ProductName, i.Quantity)));

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
                CustomerName = user?.Name ?? dto.CustomerName,
                CustomerEmail = user?.Email ?? dto.CustomerEmail,
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
                    SizeName = i.SizeName,          
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

            // خصم الكمية المباعة من المخزون الفعلي.
            foreach (var line in dto.Items)
            {
                await DeductStockAsync(line.ProductId, line.Quantity);
            }

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

        public async Task<OrderDto?> GetByIdAsync(int orderId, int requestingUserId, bool isAdmin)
        {
            var order = await _db.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null) return null;

            // A logged-in customer could otherwise view ANY order (name, address,
            // items, total) just by incrementing the id in the URL. Only the
            // order's owner or an admin may see it.
            if (!isAdmin && order.UserId != requestingUserId) return null;

            return ToDto(order);
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
            // نفس التحقق من المخزون اللي بيحصل في أوردر العميل العادي —
            // أوردر الأدمن اليدوي المفروض برضو يخصم من نفس المخزون الحقيقي.
            await EnsureStockAvailableAsync(
                dto.Items.Select(i => (i.ProductId, i.ProductName, i.Quantity)));

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
                    SizeName = i.SizeName,
                }).ToList(),
            };

            _db.Orders.Add(order);

            foreach (var line in dto.Items)
            {
                await DeductStockAsync(line.ProductId, line.Quantity);
            }

            await _db.SaveChangesAsync();

            return ToDto(order);
        }

        public async Task UpdateStatusAsync(int orderId, string status)
        {
            var order = await _db.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.OrderId == orderId)
                ?? throw new KeyNotFoundException("Order not found.");

            var wasAlreadyCancelled = string.Equals(order.Status, "cancelled", StringComparison.OrdinalIgnoreCase);
            var isNowCancelled = string.Equals(status, "cancelled", StringComparison.OrdinalIgnoreCase);

            order.Status = status;

            // Nothing in the app ever flips PaymentStatus on its own, so without this
            // every order stays "pending" forever and customers always show $0 spent.
            // Delivery is the signal we actually have (covers Cash On Delivery, which
            // is the only payment method wired up), so treat it as payment received.
            if (string.Equals(status, "delivered", StringComparison.OrdinalIgnoreCase))
            {
                order.PaymentStatus = "paid";
            }
            else if (isNowCancelled)
            {
                order.PaymentStatus = "failed";
            }

            // PlaceOrderAsync/AdminCreateOrderAsync deduct stock the moment the
            // order is placed, but nothing ever gave it back - cancelling an
            // order used to permanently lose that inventory. Restore it here,
            // once, the moment the order first becomes cancelled.
            if (isNowCancelled && !wasAlreadyCancelled)
            {
                foreach (var item in order.Items)
                {
                    await RestoreStockAsync(item.ProductId, item.Quantity);
                }
            }

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