using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Features.Admin.Commands.AssignTask;
using TaskManagement.API.Features.Admin.Commands.DeleteUser;
using TaskManagement.API.Features.Admin.Commands.UpdateUserRole;
using TaskManagement.API.Features.Admin.Queries.GetAllTasks;
using TaskManagement.API.Features.Admin.Queries.GetAllUsers;

namespace TaskManagement.API.Features.Admin
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class AdminController(IMediator mediator) : ControllerBase
    {
        [HttpGet("users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await mediator.Send(new GetAllUsersQuery());
            return StatusCode((int)result.Status, result);
        }

        [HttpGet("tasks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllTasks()
        {
            var result = await mediator.Send(new GetAllTasksQuery());
            return StatusCode((int)result.Status, result);
        }

        [HttpDelete("users/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var result = await mediator.Send(new DeleteUserCommand(userId));
            return StatusCode((int)result.Status, result);
        }

        [HttpPatch("users/{userId}/role")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUserRole(Guid userId, UpdateUserRoleCommand command)
        {
            var result = await mediator.Send(command with { UserId = userId });
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("tasks/assign")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> AssignTask(AssignTaskCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }
    }
}