using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Users.Commands.UpdateUserProfile
{
    public record UpdateUserProfileCommand(
        Guid Id,
        string FullName,
        string Email
    ) : IRequest<ApiResponse<UserDto>>;
}