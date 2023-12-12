namespace HelpDesk.api.User.ReadModels;

public record CustomerIssueSummary
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public IReadOnlyList<Issue> Issues { get; set; } = [];
}