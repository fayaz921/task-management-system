using FluentValidation;

namespace TaskManagement.API.Features.Admin.Commands.UpdateTaskStatus
{
    public class UpdateTaskStatusValidator : AbstractValidator<AdminUpdateTaskStatusCommand>
    {
        public UpdateTaskStatusValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Task id is required");

            RuleFor(x => x.Status)
                .IsInEnum().WithMessage("Invalid status value");
        }
    }
}
