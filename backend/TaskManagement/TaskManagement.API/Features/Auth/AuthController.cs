using MediatR;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Features.Auth.Login;
using TaskManagement.API.Features.Auth.RefreshToken;
using TaskManagement.API.Features.Auth.Register;

namespace TaskManagement.API.Features.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class AuthController(IMediator mediator) : ControllerBase
    {
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Register(RegisterCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("refresh-token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RefreshToken(RefreshTokenCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }
    }
}