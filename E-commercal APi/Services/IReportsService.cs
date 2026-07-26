using E_commercal_APi.ViewModels;

namespace E_commercal_APi.Services
{
    public interface IReportsService
    {
        Task<SalesReportDto> GetSalesReportAsync();
        Task<ProductsReportDto> GetProductsReportAsync();
        Task<CustomersReportDto> GetCustomersReportAsync();
    }
}