namespace E_commercal_APi.Services
{
    public interface ISettingsService
    {
        Task<Dictionary<string, string>> GetAllAsync();
        Task<Dictionary<string, string>> UpdateAsync(Dictionary<string, string> settings);
    }
}
