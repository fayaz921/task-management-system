using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.API.Features.Tasks.Commands.CreateTask;
using TaskManagement.API.Features.Tasks.Commands.DeleteTask;
using TaskManagement.API.Features.Tasks.Commands.UpdateTask;
using TaskManagement.API.Features.Tasks.Commands.UpdateTaskStatus;
using TaskManagement.API.Features.Tasks.Queries.GetTaskById;
using TaskManagement.API.Features.Tasks.Queries.GetTasks;

namespace TaskManagement.API.Features.Tasks
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class TasksController(IMediator mediator) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateTask(CreateTaskCommand command)
        {
            var result = await mediator.Send(command with { UserId = GetUserId() });
            return StatusCode((int)result.Status, result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTasks()
        {
            var result = await mediator.Send(new GetTasksQuery(GetUserId()));
            return StatusCode((int)result.Status, result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTaskById(Guid id)
        {
            var result = await mediator.Send(new GetTaskByIdQuery(id, GetUserId()));
            return StatusCode((int)result.Status, result);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTask(Guid id, UpdateTaskCommand command)
        {
            var result = await mediator.Send(command with { Id = id, UserId = GetUserId() });
            return StatusCode((int)result.Status, result);
        }

        [HttpPatch("{id}/status")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTaskStatus(Guid id, UpdateTaskStatusCommand command)
        {
            var result = await mediator.Send(command with { Id = id, UserId = GetUserId() });
            return StatusCode((int)result.Status, result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var result = await mediator.Send(new DeleteTaskCommand(id, GetUserId()));
            return StatusCode((int)result.Status, result);
        }
    }
}