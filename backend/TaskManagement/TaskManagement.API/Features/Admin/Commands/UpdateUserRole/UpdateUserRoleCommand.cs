using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Users;

namespace TaskManagement.API.Features.Admin.Commands.UpdateUserRole
{
    public record UpdateUserRoleCommand(
        Guid UserId,
        UserRole Role
    ) : IRequest<ApiResponse<UserDto>>;
}