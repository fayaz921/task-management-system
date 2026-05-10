using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Users;

namespace TaskManagement.API.Features.Admin.Queries.GetAllUsers
{
    public record GetAllUsersQuery : IRequest<ApiResponse<List<UserDto>>>;
}