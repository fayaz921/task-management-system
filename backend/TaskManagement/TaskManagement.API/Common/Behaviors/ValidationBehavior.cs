using FluentValidation;
using MediatR;
using ValidationException = TaskManagement.API.Common.Exceptions.ValidationException;

namespace TaskManagement.API.Common.Behaviors;

public class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        if (!validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);

        var errors = validators
            .Select(v => v.Validate(context))
            .SelectMany(result => result.Errors)
            .Where(failure => failure != null)
            .Select(failure => failure.ErrorMessage)
            .ToList();

        if (errors.Any())
            throw new ValidationException(errors);

        return await next();
    }
}