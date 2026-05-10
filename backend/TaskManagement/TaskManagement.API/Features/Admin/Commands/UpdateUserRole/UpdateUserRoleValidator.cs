using FluentValidation;
using TaskManagement.API.Domain.Enums;

namespace TaskManagement.API.Features.Admin.Commands.UpdateUserRole
{
    public class UpdateUserRoleValidator : AbstractValidator<UpdateUserRoleCommand>
    {
        public UpdateUserRoleValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("User id is required");

            RuleFor(x => x.Role)
                .IsInEnum().WithMessage("Invalid role value");
        }
    }
}