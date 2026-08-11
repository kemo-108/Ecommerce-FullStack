using Microsoft.AspNetCore.Http;

namespace E_commercal_APi.Services
{
    public interface ICloudinaryService
    {
        /// <summary>
        /// Uploads an image to Cloudinary under the given folder and returns its secure URL.
        /// Returns null if the file is empty/missing.
        /// </summary>
        Task<string?> UploadImageAsync(IFormFile file, string folder);

        /// <summary>
        /// Uploads a file already sitting on local disk (used for one-time
        /// migration of images saved before Cloudinary was wired up).
        /// </summary>
        Task<string?> UploadFromPathAsync(string filePath, string folder);

        /// <summary>
        /// Deletes a previously-uploaded image from Cloudinary given its secure URL.
        /// No-ops if the URL isn't a Cloudinary URL (e.g. legacy local paths).
        /// </summary>
        Task DeleteImageAsync(string? imageUrl);
    }
}
