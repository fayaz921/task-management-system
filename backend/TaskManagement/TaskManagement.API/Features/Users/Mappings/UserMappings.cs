using TaskManagement.API.Domain.Entities;

namespace TaskManagement.API.Features.Users.Mappings
{
    public static class UserMappings
    {
        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };
        }
    }
}