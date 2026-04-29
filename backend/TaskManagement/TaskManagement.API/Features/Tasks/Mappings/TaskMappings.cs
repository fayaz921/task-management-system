using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Tasks.Commands.CreateTask;

namespace TaskManagement.API.Features.Tasks.Mappings
{
    public static class TaskMappings
    {
        public static TaskDto ToDto(this TaskItem task)
        {
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                Priority = task.Priority,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt,
                UserId = task.UserId
            };
        }

        public static TaskItem ToEntity(this CreateTaskCommand command)
        {
            return new TaskItem
            {
                Title = command.Title,
                Description = command.Description,
                Status = command.Status,
                Priority = command.Priority,
                DueDate = command.DueDate,
                UserId = command.UserId
            };
        }
    }
}