using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Tasks;

namespace TaskManagement.API.Features.Admin.Commands.RestoreTask
{
    public record RestoreTaskCommand(Guid Id) : IRequest<ApiResponse<TaskDto>>;
}