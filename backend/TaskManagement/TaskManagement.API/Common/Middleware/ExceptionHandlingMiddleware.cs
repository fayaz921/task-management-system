using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using System.Net;
using ValidationException = TaskManagement.API.Common.Exceptions.ValidationException;

namespace TaskManagement.API.Common.Middleware
{
    public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (NotFoundException ex)
            {
                logger.LogWarning(ex, "Not found: {Message}", ex.Message);
                await WriteResponse(context, HttpStatusCode.NotFound,
                    ApiResponse<string>.Fail(ex.Message, HttpStatusCode.NotFound));
            }
            catch (ValidationException ex)
            {
                logger.LogWarning("Validation failed: {Errors}", ex.Errors);
                await WriteResponse(context, HttpStatusCode.BadRequest,
                    ApiResponse<string>.Fail(string.Join(", ", ex.Errors), HttpStatusCode.BadRequest));
            }
            catch (UnauthorizedException ex)
            {
                logger.LogWarning(ex, "Unauthorized: {Message}", ex.Message);
                await WriteResponse(context, HttpStatusCode.Unauthorized,
                    ApiResponse<string>.Fail(ex.Message, HttpStatusCode.Unauthorized));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
                await WriteResponse(context, HttpStatusCode.InternalServerError,
                    ApiResponse<string>.Fail("Something went wrong. Please try again.", HttpStatusCode.InternalServerError));
            }
        }

        private static async Task WriteResponse<T>(
            HttpContext context,
            HttpStatusCode statusCode,
            ApiResponse<T> response)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}