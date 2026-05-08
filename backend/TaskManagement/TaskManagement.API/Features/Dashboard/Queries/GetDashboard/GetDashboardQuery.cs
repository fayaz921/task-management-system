using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Dashboard.Queries.GetDashboard
{
    public record GetDashboardQuery(Guid UserId) : IRequest<ApiResponse<DashboardDto>>;
}