using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Users.Queries.GetUserProfile
{
    public record GetUserProfileQuery(Guid UserId) : IRequest<ApiResponse<UserDto>>;
}