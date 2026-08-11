using E_commercal_APi.Data;
using E_commercal_APi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Controllers
{
    // One-time maintenance tools for the admin dashboard. Not meant to be
    // called by regular app traffic.
    [ApiController]
    [Route("api/admin/maintenance")]
    [Authorize(Roles = "admin")]
    public class AdminMaintenanceController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ICloudinaryService _cloudinary;
        private readonly IWebHostEnvironment _env;

        public AdminMaintenanceController(AppDbContext db, ICloudinaryService cloudinary, IWebHostEnvironment env)
        {
            _db = db;
            _cloudinary = cloudinary;
            _env = env;
        }

        // POST /api/admin/maintenance/migrate-images-to-cloudinary
        // Run this ONCE after deploying the Cloudinary fix. It walks every
        // product/color image that still points at a local wwwroot/uploads
        // path, re-uploads it to Cloudinary, and rewrites the DB row to the
        // new secure URL. Safe to call more than once — anything already
        // starting with http(s) is skipped.
        [HttpPost("migrate-images-to-cloudinary")]
        public async Task<IActionResult> MigrateImagesToCloudinary()
        {
            int migrated = 0, skippedMissingFile = 0, alreadyOnCloudinary = 0, failed = 0;
            var errors = new List<string>();

            static bool IsLocal(string? url) =>
                !string.IsNullOrWhiteSpace(url) &&
                !url.StartsWith("http://", StringComparison.OrdinalIgnoreCase) &&
                !url.StartsWith("https://", StringComparison.OrdinalIgnoreCase);

            async Task<string?> MigrateOne(string? relativeUrl, string folder)
            {
                if (string.IsNullOrWhiteSpace(relativeUrl)) return relativeUrl;
                if (!IsLocal(relativeUrl)) { alreadyOnCloudinary++; return relativeUrl; }

                var fullPath = Path.Combine(_env.WebRootPath, relativeUrl.Replace('/', Path.DirectorySeparatorChar));
                if (!System.IO.File.Exists(fullPath))
                {
                    skippedMissingFile++;
                    errors.Add($"File not found on disk, left as-is: {relativeUrl}");
                    return relativeUrl;
                }

                try
                {
                    var newUrl = await _cloudinary.UploadFromPathAsync(fullPath, folder);
                    migrated++;
                    return newUrl ?? relativeUrl;
                }
                catch (Exception ex)
                {
                    failed++;
                    errors.Add($"Failed to migrate {relativeUrl}: {ex.Message}");
                    return relativeUrl; // keep the old value, don't lose the reference
                }
            }

            var products = await _db.Products.ToListAsync();
            foreach (var p in products)
                p.ImageUrl = await MigrateOne(p.ImageUrl, "ecommerce/products");
            await _db.SaveChangesAsync();

            var gallery = await _db.ProductImages.ToListAsync();
            foreach (var img in gallery)
                img.ImageUrl = await MigrateOne(img.ImageUrl, "ecommerce/products");
            await _db.SaveChangesAsync();

            var colors = await _db.ProductColors.ToListAsync();
            foreach (var c in colors)
                c.ImageUrl = await MigrateOne(c.ImageUrl, "ecommerce/products/colors");
            await _db.SaveChangesAsync();

            return Ok(new
            {
                migrated,
                alreadyOnCloudinary,
                skippedMissingFile,
                failed,
                errors
            });
        }
    }
}
