using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IDashboardService
    {
        Task<DashboardStatsDto> GetStatsAsync();
    }
}
