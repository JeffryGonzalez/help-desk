using HelpDesk.api.User.Api;
using HelpDesk.api.User.ReadModels;
using Marten.Events;
using Marten.Events.Projections;
using Wolverine;

namespace HelpDesk.api.Techs.ReadModels;

public record PendingIssueSummary
{
    public int Id { get; set; }
    public int Version { get; set; }
    public IReadOnlyList<Issue> Issues { get; set; } = [];
}

public class PendingIssuesSummaryProjection : MultiStreamProjection<PendingIssueSummary, int> {

    public PendingIssuesSummaryProjection()
    {
        Identity<IssueCreated>(r => 1);
    }

    public void Apply(IEvent<IssueCreated> created, PendingIssueSummary current)
    {
        var issue = new Issue
        {
            Id = created.Data.Id,
            Created = created.Timestamp,
            Description = created.Data.Description,
            Status = IssueStatus.AwaitingTechAssignment,
            UserId = created.Data.CustomerId
        };
        current.Issues = [issue, .. current.Issues];
    }
}
