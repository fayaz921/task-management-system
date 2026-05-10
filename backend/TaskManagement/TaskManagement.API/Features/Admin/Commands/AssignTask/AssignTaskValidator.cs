using FluentValidation;

namespace TaskManagement.API.Features.Admin.Commands.AssignTask
{
    public class AssignTaskValidator : AbstractValidator<AssignTaskCommand>
    {
        public AssignTaskValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("User id is required");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200).WithMessage("Title cannot exceed 200 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(x => x.DueDate)
                .NotEmpty().WithMessage("Due date is required")
                .GreaterThan(DateTime.UtcNow).WithMessage("Due date must be in the future");
        }
    }
}