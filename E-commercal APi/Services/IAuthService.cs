using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
        Task LogoutAsync(string refreshToken);
        Task ForgotPasswordAsync(string email);
        Task ResetPasswordAsync(string token, string newPassword);
        Task<UserDto?> GetMeAsync(int userId);
        Task<UserDto> UpdateMeAsync(int userId, UpdateMeDto dto);
    }
}
