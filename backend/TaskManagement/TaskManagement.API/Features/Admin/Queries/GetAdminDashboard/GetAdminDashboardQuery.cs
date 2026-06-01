using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Admin.Queries.GetAdminDashboard
{
    public record GetAdminDashboardQuery() : IRequest<ApiResponse<AdminDashboardDto>>;
}
