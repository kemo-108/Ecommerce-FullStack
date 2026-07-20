using System.ComponentModel.DataAnnotations;

namespace E_commercal_APi.ViewModels
{
    public class RegisterDto
    {
        [Required] public string Name { get; set; }
        [Required, EmailAddress] public string Email { get; set; }
        [Required] public string Phone { get; set; }
        [Required, MinLength(6)] public string Password { get; set; }
    }

    public class LoginDto
    {
        [Required, EmailAddress] public string Email { get; set; }
        [Required] public string Password { get; set; }
        public bool Remember { get; set; }
    }

    public class RefreshTokenDto
    {
        [Required] public string RefreshToken { get; set; }
    }

    public class ForgotPasswordDto
    {
        [Required, EmailAddress] public string Email { get; set; }
    }

    public class ResetPasswordDto
    {
        [Required] public string Token { get; set; }
        [Required, MinLength(6)] public string NewPassword { get; set; }
    }

    public class UpdateMeDto
    {
        [Required] public string Name { get; set; }
        [Required] public string Phone { get; set; }
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public DateTime Joined { get; set; }
    }

    public class AuthResponseDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public UserDto User { get; set; }
    }

    public class ChangePasswordDto
    {
        [Required] public string CurrentPassword { get; set; }
        [Required, MinLength(6)] public string NewPassword { get; set; }
    }
}
