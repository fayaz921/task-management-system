using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Infrastructure.Extensions
{
    public static class DatabaseExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}
