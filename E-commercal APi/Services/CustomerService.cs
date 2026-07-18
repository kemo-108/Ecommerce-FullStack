using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _db;

        public CustomerService(AppDbContext db)
        {
            _db = db;
        }

        // VIP / New thresholds - adjust these if the business rule should be different.
        private const decimal VipSpendThreshold = 1000m;
        private const int NewCustomerDays = 30;

        private static string MapType(decimal totalSpent, DateTime joined)
        {
            if (totalSpent >= VipSpendThreshold) return "VIP";
            if (joined >= DateTime.UtcNow.AddDays(-NewCustomerDays)) return "New";
            return "Regular";
        }

        private static string MapStatus(string status) =>
            status == "active" ? "Active" : "Blocked";

        public async Task<List<CustomerListDto>> GetAllAsync()
        {
            var customers = await _db.Users
                .Where(u => u.Role == "customer")
                .ToListAsync();

            // One grouped query for order stats instead of querying per-customer (N+1).
            var orderStats = await _db.Orders
                .Where(o => o.PaymentStatus == "paid")
                .GroupBy(o => o.UserId)
                .Select(g => new { UserId = g.Key, Count = g.Count(), Total = g.Sum(o => o.Total) })
                .ToListAsync();

            var statsByUser = orderStats.ToDictionary(s => s.UserId, s => s);

            return customers.Select(u =>
            {
                statsByUser.TryGetValue(u.Id, out var stats);
                var totalSpent = stats?.Total ?? 0;

                return new CustomerListDto
                {
                    CustomerId = u.Id,
                    CustomerName = u.Name,
                    Email = u.Email,
                    Phone = u.Phone,
                    Avatar = u.Avatar,
                    TotalOrders = stats?.Count ?? 0,
                    TotalSpent = totalSpent,
                    Status = MapStatus(u.Status),
                    Type = MapType(totalSpent, u.Joined),
                    Joined = u.Joined.ToString("dd MMM yyyy"),
                };
            }).ToList();
        }

        public async Task<CustomerListDto?> GetByIdAsync(int id)
        {
            var u = await _db.Users.FirstOrDefaultAsync(u => u.Id == id && u.Role == "customer");
            if (u == null) return null;

            var stats = await _db.Orders
                .Where(o => o.UserId == id && o.PaymentStatus == "paid")
                .GroupBy(o => o.UserId)
                .Select(g => new { Count = g.Count(), Total = g.Sum(o => o.Total) })
                .FirstOrDefaultAsync();

            var totalSpent = stats?.Total ?? 0;

            return new CustomerListDto
            {
                CustomerId = u.Id,
                CustomerName = u.Name,
                Email = u.Email,
                Phone = u.Phone,
                Avatar = u.Avatar,
                TotalOrders = stats?.Count ?? 0,
                TotalSpent = totalSpent,
                Status = MapStatus(u.Status),
                Type = MapType(totalSpent, u.Joined),
                Joined = u.Joined.ToString("dd MMM yyyy"),
            };
        }

        public async Task<CustomerListDto> CreateAsync(CustomerCreateDto dto)
        {
            var exists = await _db.Users.AnyAsync(u => u.Email == dto.Email);
            if (exists)
                throw new InvalidOperationException("An account with this email already exists.");

            // No email provider is wired up yet, so we generate a temp password
            // rather than leave PasswordHash empty. The customer sets their own
            // via "Forgot Password" once they try to log in.
            var tempPassword = Guid.NewGuid().ToString("N").Substring(0, 12);

            var user = new User
            {
                Name = dto.CustomerName,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword),
                Role = "customer",
                Status = dto.Status == "Active" ? "active" : "banned",
                EmailVerified = false,
                Joined = DateTime.UtcNow,
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return await GetByIdAsync(user.Id)
                ?? throw new InvalidOperationException("Failed to load the newly created customer.");
        }

        public async Task<CustomerListDto> UpdateAsync(int id, CustomerUpdateDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id && u.Role == "customer")
                ?? throw new KeyNotFoundException("Customer not found.");

            user.Name = dto.CustomerName;
            user.Email = dto.Email;
            user.Phone = dto.Phone;
            user.Status = dto.Status == "Active" ? "active" : "banned";
            user.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return await GetByIdAsync(id) ?? throw new KeyNotFoundException("Customer not found.");
        }

        public async Task DeleteAsync(int id)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id && u.Role == "customer")
                ?? throw new KeyNotFoundException("Customer not found.");

            var hasOrders = await _db.Orders.AnyAsync(o => o.UserId == id);
            if (hasOrders)
                throw new InvalidOperationException(
                    "This customer has order history and can't be deleted.");

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
        }
    }
}
