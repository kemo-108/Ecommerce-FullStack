using E_commercal_APi.Models;

namespace E_commercal_APi.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
    }
}
