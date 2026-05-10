using FluentValidation;
using MediatR;
using TaskManagement.API.Common.Behaviors;
using TaskManagement.API.Infrastructure.Services.Email;

namespace TaskManagement.API.Infrastructure.Extensions
{
    public static class ApplicationExtensions
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

            services.AddValidatorsFromAssembly(typeof(Program).Assembly);

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

             // Email
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddScoped<IEmailService, EmailService>();


            return services;
        }
    }
}
