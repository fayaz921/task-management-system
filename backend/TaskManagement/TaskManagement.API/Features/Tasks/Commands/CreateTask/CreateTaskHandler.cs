using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Tasks.Commands.CreateTask
{
    public class CreateTaskHandler(AppDbContext db) : IRequestHandler<CreateTaskCommand, ApiResponse<TaskDto>>
    {
        public async Task<ApiResponse<TaskDto>> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            var taskEntity = request.ToEntity();

           await db.Tasks.AddAsync(taskEntity,cancellationToken);
           await db.SaveChangesAsync(cancellationToken);

            return ApiResponse<TaskDto>.Created(taskEntity.ToDto(),"Task created successfully");
        }
    }
}
