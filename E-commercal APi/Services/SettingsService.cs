using E_commercal_APi.Data;
using E_commercal_APi.Models;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class SettingsService : ISettingsService
    {
        private readonly AppDbContext _db;

        public SettingsService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Dictionary<string, string>> GetAllAsync()
        {
            var settings = await _db.StoreSettings.ToListAsync();
            return settings.ToDictionary(s => s.Key, s => s.Value);
        }

        public async Task<Dictionary<string, string>> UpdateAsync(Dictionary<string, string> settings)
        {
            foreach (var (key, value) in settings)
            {
                var existing = await _db.StoreSettings
                    .FirstOrDefaultAsync(s => s.Key == key);

                if (existing != null)
                {
                    existing.Value = value;
                    existing.UpdatedAt = DateTime.UtcNow;
                }
                else
                {
                    _db.StoreSettings.Add(new StoreSetting
                    {
                        Key = key,
                        Value = value,
                        UpdatedAt = DateTime.UtcNow,
                    });
                }
            }

            await _db.SaveChangesAsync();
            return await GetAllAsync();
        }
    }
}
