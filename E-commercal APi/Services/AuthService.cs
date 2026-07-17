using E_commercal_APi.Data;
using E_commercal_APi.Models;
using E_commercal_APi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace E_commercal_APi.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _db;
        private readonly ITokenService _tokenService;

        public AuthService(AppDbContext db, ITokenService tokenService)
        {
            _db = db;
            _tokenService = tokenService;
        }

        private static UserDto ToDto(User u) => new()
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            Phone = u.Phone,
            Avatar = u.Avatar,
            Role = u.Role,
            Status = u.Status,
        };

        private async Task<AuthResponseDto> IssueTokensAsync(User user)
        {
            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshTokenValue = _tokenService.GenerateRefreshToken();

            _db.RefreshTokens.Add(new RefreshToken
            {
                UserId = user.Id,
                Token = refreshTokenValue,
                ExpiresAt = DateTime.UtcNow.AddDays(30),
                Revoked = false,
                CreatedAt = DateTime.UtcNow,
            });

            await _db.SaveChangesAsync();

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshTokenValue,
                User = ToDto(user),
            };
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            var exists = await _db.Users.AnyAsync(u => u.Email == dto.Email);
            if (exists)
                throw new InvalidOperationException("An account with this email already exists.");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "customer",
                Status = "active",
                EmailVerified = false,
                Joined = DateTime.UtcNow,
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return await IssueTokensAsync(user);
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid email or password.");

            if (user.Status != "active")
                throw new UnauthorizedAccessException("This account is not active.");

            return await IssueTokensAsync(user);
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            var stored = await _db.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (stored == null || stored.Revoked || stored.ExpiresAt < DateTime.UtcNow)
                throw new UnauthorizedAccessException("Invalid or expired refresh token.");

            var user = await _db.Users.FindAsync(stored.UserId);
            if (user == null)
                throw new UnauthorizedAccessException("User not found.");

            stored.Revoked = true;
            await _db.SaveChangesAsync();

            return await IssueTokensAsync(user);
        }

        public async Task LogoutAsync(string refreshToken)
        {
            var stored = await _db.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (stored != null)
            {
                stored.Revoked = true;
                await _db.SaveChangesAsync();
            }
        }

        public async Task ForgotPasswordAsync(string email)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

            // Always succeed silently even if the email doesn't exist,
            // so we don't leak which emails are registered.
            if (user == null) return;

            var token = _tokenService.GenerateRefreshToken();

            _db.PasswordResets.Add(new PasswordReset
            {
                UserId = user.Id,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(1),
                Used = false,
                CreatedAt = DateTime.UtcNow,
            });

            await _db.SaveChangesAsync();

            // TODO: plug in a real email provider (SendGrid/SMTP) to email `token` to the user.
        }

        public async Task ResetPasswordAsync(string token, string newPassword)
        {
            var reset = await _db.PasswordResets
                .FirstOrDefaultAsync(r => r.Token == token);

            if (reset == null || reset.Used || reset.ExpiresAt < DateTime.UtcNow)
                throw new InvalidOperationException("Invalid or expired reset token.");

            var user = await _db.Users.FindAsync(reset.UserId);
            if (user == null)
                throw new InvalidOperationException("User not found.");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            reset.Used = true;

            await _db.SaveChangesAsync();
        }
    }
}
