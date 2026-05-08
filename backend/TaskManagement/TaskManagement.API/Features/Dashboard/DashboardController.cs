using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.API.Features.Dashboard.Queries.GetDashboard;

namespace TaskManagement.API.Features.Dashboard
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class DashboardController(IMediator mediator) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await mediator.Send(new GetDashboardQuery(GetUserId()));
            return StatusCode((int)result.Status, result);
        }
    }
}