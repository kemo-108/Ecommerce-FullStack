using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using E_commercal_APi.Models;
using Microsoft.Extensions.Options;

namespace E_commercal_APi.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(IOptions<CloudinarySettings> config)
        {
            var settings = config.Value;

            // Fail fast and loud instead of letting every upload silently
            // return a broken URL because the settings never made it through.
            if (string.IsNullOrWhiteSpace(settings.CloudName) ||
                string.IsNullOrWhiteSpace(settings.ApiKey) ||
                string.IsNullOrWhiteSpace(settings.ApiSecret))
            {
                throw new InvalidOperationException(
                    "Cloudinary is not configured. Check the \"CloudinarySettings\" " +
                    "(CloudName/ApiKey/ApiSecret) section in appsettings.json.");
            }

            var account = new Account(settings.CloudName, settings.ApiKey, settings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string?> UploadImageAsync(IFormFile file, string folder)
        {
            if (file == null || file.Length <= 0)
                return null;

            using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = folder,          // e.g. "ecommerce/products"
                UseFilename = false,
                UniqueFilename = true,
                Overwrite = false
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error != null)
                throw new InvalidOperationException($"Cloudinary upload failed: {result.Error.Message}");

            return result.SecureUrl?.ToString();
        }

        public async Task<string?> UploadFromPathAsync(string filePath, string folder)
        {
            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
                return null;

            using var stream = File.OpenRead(filePath);

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(Path.GetFileName(filePath), stream),
                Folder = folder,
                UseFilename = false,
                UniqueFilename = true,
                Overwrite = false
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error != null)
                throw new InvalidOperationException($"Cloudinary upload failed: {result.Error.Message}");

            return result.SecureUrl?.ToString();
        }

        public async Task DeleteImageAsync(string? imageUrl)
        {
            var publicId = ExtractPublicId(imageUrl);
            if (string.IsNullOrEmpty(publicId))
                return; // not a Cloudinary URL (e.g. an old local /uploads path) - nothing to do

            await _cloudinary.DestroyAsync(new DeletionParams(publicId));
        }

        // Cloudinary secure URLs look like:
        //   https://res.cloudinary.com/<cloud>/image/upload/v169.../ecommerce/products/abc123.png
        // The public_id needed for deletion is "ecommerce/products/abc123"
        // (folder + filename, no version, no extension).
        private static string? ExtractPublicId(string? url)
        {
            if (string.IsNullOrWhiteSpace(url) || url.IndexOf("res.cloudinary.com", StringComparison.OrdinalIgnoreCase) < 0)
                return null;

            var uploadMarker = "/upload/";
            var uploadIndex = url.IndexOf(uploadMarker, StringComparison.OrdinalIgnoreCase);
            if (uploadIndex < 0)
                return null;

            var afterUpload = url[(uploadIndex + uploadMarker.Length)..];
            var segments = afterUpload.Split('/');

            var isVersionSegment = segments.Length > 0
                && segments[0].Length > 1
                && segments[0][0] == 'v'
                && segments[0][1..].All(char.IsDigit);

            var pathSegments = isVersionSegment ? segments[1..] : segments;
            var pathWithExtension = string.Join('/', pathSegments);

            var lastDot = pathWithExtension.LastIndexOf('.');
            return lastDot >= 0 ? pathWithExtension[..lastDot] : pathWithExtension;
        }
    }
}
