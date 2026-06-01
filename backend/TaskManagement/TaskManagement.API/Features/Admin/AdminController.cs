using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Features.Admin.Commands.AssignTask;
using TaskManagement.API.Features.Admin.Commands.DeleteTask;
using TaskManagement.API.Features.Admin.Commands.DeleteUser;
using TaskManagement.API.Features.Admin.Commands.RestoreTask;
using TaskManagement.API.Features.Admin.Commands.UpdateTask;
using TaskManagement.API.Features.Admin.Commands.UpdateTaskStatus;
using TaskManagement.API.Features.Admin.Commands.UpdateUserRole;
using TaskManagement.API.Features.Admin.Queries.GetAdminDashboard;
using TaskManagement.API.Features.Admin.Queries.GetAllTasks;
using TaskManagement.API.Features.Admin.Queries.GetAllUsers;
using TaskManagement.API.Features.Admin.Queries.GetDeletedTasks;

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
        [HttpGet("dashboard")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await mediator.Send(new GetAdminDashboardQuery());
            return StatusCode((int)result.Status, result);
        }

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

        [HttpGet("tasks/deleted")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeletedTasks()
        {
            var result = await mediator.Send(new GetDeletedTasksQuery());
            return StatusCode((int)result.Status, result);
        }

        [HttpPatch("tasks/{id}/restore")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> RestoreTask(Guid id)
        {
            var result = await mediator.Send(new RestoreTaskCommand(id));
            return StatusCode((int)result.Status, result);
        }

        [HttpDelete("tasks/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var result = await mediator.Send(new DeleteTaskCommand(id));
            return StatusCode((int)result.Status, result);
        }

        [HttpPut("tasks/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTask(Guid id, AdminUpdateTaskCommand command)
        {
            var result = await mediator.Send(command with { Id = id });
            return StatusCode((int)result.Status, result);
        }

        [HttpPatch("tasks/{id}/status")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTaskStatus(Guid id, AdminUpdateTaskStatusCommand command)
        {
            var result = await mediator.Send(command with { Id = id });
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
