using FluentValidation;

namespace TaskManagement.API.Features.Admin.Commands.UpdateTask
{
    public class UpdateTaskValidator : AbstractValidator<AdminUpdateTaskCommand>
    {
        public UpdateTaskValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Task id is required");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200).WithMessage("Title cannot exceed 200 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(x => x.Status)
                .IsInEnum().WithMessage("Invalid status value");

            RuleFor(x => x.Priority)
                .IsInEnum().WithMessage("Invalid priority value");

            RuleFor(x => x.DueDate)
                .NotEmpty().WithMessage("Due date is required");
        }
    }
}
