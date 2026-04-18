using System.Net;

namespace TaskManagement.API.Common.ApiResponse
{
    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public HttpStatusCode Status { get; set; }

        public static ApiResponse<T> Ok(T data, string message = "Success") =>
            new() { Data = data, IsSuccess = true, Status = HttpStatusCode.OK, Message = message };

        public static ApiResponse<T> Ok(string message) =>
            new() { Data = default!, IsSuccess = true, Status = HttpStatusCode.OK, Message = message };

        public static ApiResponse<T> Created(T data, string message = "Created successfully") =>
            new() { Data = data, IsSuccess = true, Status = HttpStatusCode.Created, Message = message };

        public static ApiResponse<T> Fail(string message, HttpStatusCode status = HttpStatusCode.BadRequest) =>
            new() { Data = default, IsSuccess = false, Status = status, Message = message };
    }
}