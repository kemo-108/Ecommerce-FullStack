using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class AddressService : IAddressService
    {
        private readonly AppDbContext _db;

        public AddressService(AppDbContext db)
        {
            _db = db;
        }

        private static AddressDto ToDto(Address a) => new()
        {
            Id = a.Id,
            Name = a.Name,
            Type = a.Type,
            Phone = a.Phone,
            AddressLine = a.AddressLine,
            City = a.City,
            Governorate = a.Governorate,
            Country = a.Country,
            PostalCode = a.PostalCode,
            Default = a.Default,
        };

        public async Task<List<AddressDto>> GetMyAddressesAsync(int userId)
        {
            var addresses = await _db.Addresses
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.Default)
                .ToListAsync();

            return addresses.Select(ToDto).ToList();
        }

        public async Task<AddressDto> CreateAsync(int userId, AddressCreateDto dto)
        {
            var address = new Address
            {
                UserId = userId,
                Name = dto.Name,
                Type = dto.Type,
                Phone = dto.Phone,
                AddressLine = dto.AddressLine,
                City = dto.City,
                Governorate = dto.Governorate,
                Country = dto.Country,
                PostalCode = dto.PostalCode,
                Default = dto.Default,
            };

            var hasAnyAddress = await _db.Addresses.AnyAsync(a => a.UserId == userId);
            if (dto.Default || !hasAnyAddress)
            {
                address.Default = true;
                await UnsetOtherDefaultsAsync(userId, excludeId: null);
            }

            _db.Addresses.Add(address);
            await _db.SaveChangesAsync();

            return ToDto(address);
        }

        public async Task<AddressDto> UpdateAsync(int userId, int addressId, AddressCreateDto dto)
        {
            var address = await _db.Addresses
                .FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId)
                ?? throw new KeyNotFoundException("Address not found.");

            address.Name = dto.Name;
            address.Type = dto.Type;
            address.Phone = dto.Phone;
            address.AddressLine = dto.AddressLine;
            address.City = dto.City;
            address.Governorate = dto.Governorate;
            address.Country = dto.Country;
            address.PostalCode = dto.PostalCode;

            if (dto.Default && !address.Default)
            {
                await UnsetOtherDefaultsAsync(userId, excludeId: addressId);
                address.Default = true;
            }

            await _db.SaveChangesAsync();
            return ToDto(address);
        }

        public async Task DeleteAsync(int userId, int addressId)
        {
            var address = await _db.Addresses
                .FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId)
                ?? throw new KeyNotFoundException("Address not found.");

            var wasDefault = address.Default;

            _db.Addresses.Remove(address);
            await _db.SaveChangesAsync();

            if (wasDefault)
            {
                var nextAddress = await _db.Addresses
                    .Where(a => a.UserId == userId)
                    .FirstOrDefaultAsync();

                if (nextAddress != null)
                {
                    nextAddress.Default = true;
                    await _db.SaveChangesAsync();
                }
            }
        }

        public async Task<AddressDto> SetDefaultAsync(int userId, int addressId)
        {
            var address = await _db.Addresses
                .FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId)
                ?? throw new KeyNotFoundException("Address not found.");

            await UnsetOtherDefaultsAsync(userId, excludeId: addressId);
            address.Default = true;

            await _db.SaveChangesAsync();
            return ToDto(address);
        }

        private async Task UnsetOtherDefaultsAsync(int userId, int? excludeId)
        {
            var others = await _db.Addresses
                .Where(a => a.UserId == userId && a.Default && a.Id != excludeId)
                .ToListAsync();

            foreach (var addr in others)
                addr.Default = false;
        }
    }
}