using TaskManagement.API.Domain.Enums;

namespace TaskManagement.API.Features.Tasks
{
    public class TaskDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TaskItemStatus Status { get; set; }
        public TaskPriority Priority { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Guid UserId { get; set; }
    }
}