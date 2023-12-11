using HelpDesk.api.User.Api;
using Marten.Events;
using Marten.Events.Aggregation;
using Marten.Events.Projections;
using System.Diagnostics;

namespace HelpDesk.api.User.ReadModels;
public enum IssueStatus
{
    AwaitingTechAssignment
}
public record Issue
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public Guid UserId { get; set; }
    public DateTimeOffset Created { get; set; }
    public string Description { get; set; } = string.Empty;

    public IssueStatus Status { get; set; }
}

public class IssueProjections: SingleStreamProjection<Issue>
{
    public Issue Create(IEvent<IssueCreated> @event)
    {
        return new Issue
        {
            Id = @event.Id,
            UserId = @event.Data.CustomerId,
            Created = @event.Timestamp,
            Version = 1,
            Description = @event.Data.Description,
            Status = IssueStatus.AwaitingTechAssignment
        };
    }
}

public record CustomerIssueSummary
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public IReadOnlyList<Issue> Issues { get; set; } = [];
}

public class CustomerIssueSummaryProjection : MultiStreamProjection<CustomerIssueSummary, Guid>
{
    public CustomerIssueSummaryProjection()
    {
        Identity<IssueCreated>(e => e.CustomerId);
        CustomGrouping(new CustomerIssueSummaryGrouper());
    }

    public void Apply(IEvent<IssueCreated> created, CustomerIssueSummary current )
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
