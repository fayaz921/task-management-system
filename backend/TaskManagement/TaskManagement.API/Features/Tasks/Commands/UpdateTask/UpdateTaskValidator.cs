using FluentValidation;

namespace TaskManagement.API.Features.Tasks.Commands.UpdateTask
{
    public class UpdateTaskValidator : AbstractValidator<UpdateTaskCommand>
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

            RuleFor(x => x.DueDate)
                .NotEmpty().WithMessage("Due date is required");
        }
    }
}
