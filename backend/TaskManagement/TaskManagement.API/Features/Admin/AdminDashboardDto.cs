namespace TaskManagement.API.Features.Admin
{
    public class AdminDashboardDto
    {
        public int TotalUsers { get; set; }
        public int ActiveTasks { get; set; }
        public int DeletedTasks { get; set; }
        public int CompletedTasks { get; set; }
        public List<AdminActivityDto> RecentActivity { get; set; } = new();
    }

    public class AdminActivityDto
    {
        public string Actor { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public DateTime Time { get; set; }
    }
}
