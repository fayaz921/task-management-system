using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.API.Features.Users.Commands.UpdateUserProfile;
using TaskManagement.API.Features.Users.Queries.GetUserProfile;

namespace TaskManagement.API.Features.Users
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class UsersController(IMediator mediator) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet("profile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserProfile()
        {
            var result = await mediator.Send(new GetUserProfileQuery(GetUserId()));
            return StatusCode((int)result.Status, result);
        }

        [HttpPut("profile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUserProfile(UpdateUserProfileCommand command)
        {
            var result = await mediator.Send(command with { Id = GetUserId() });
            return StatusCode((int)result.Status, result);
        }
    }
}