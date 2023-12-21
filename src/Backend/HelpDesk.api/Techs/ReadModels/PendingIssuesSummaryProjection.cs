using HelpDesk.api.Techs.Api;
using HelpDesk.api.User.Api;
using HelpDesk.api.User.ReadModels;
using Marten;
using Marten.Events;
using Marten.Events.Projections;
using Wolverine;

namespace HelpDesk.api.Techs.ReadModels;

public record TechPendingIssue : Issue
{
    public Contact Contact { get; set; } = new();
}
public record PendingIssueSummary
{
    public int Id { get; set; }
    public int Version { get; set; }
    public IReadOnlyList<TechPendingIssue> Issues { get; set; } = [];
}

public class PendingIssuesSummaryProjection : MultiStreamProjection<PendingIssueSummary, int> {

    public PendingIssuesSummaryProjection()
    {
        Identity<IssueCreated>(r => 1);
        Identity<IssueAssignedToTech>( i => 1);
    }

    public async Task Apply(IEvent<IssueCreated> created, PendingIssueSummary current, IQuerySession session)
    {
        // TODO if I give them a way to change their contact information, this will need to be handled here.
        var contact = await session.LoadAsync<Contact>(created.Data.CustomerId);
        var issue = new TechPendingIssue()
        {
            Id = created.Data.Id,
            Created = created.Timestamp,
            Description = created.Data.Description,
            Status = IssueStatus.AwaitingTechAssignment,
            UserId = created.Data.CustomerId,
            Contact = contact!
        };
        current.Issues = [issue, .. current.Issues];
    }

    public PendingIssueSummary Apply(IssueAssignedToTech assigned, PendingIssueSummary current)
    {
        return current with { Issues = current.Issues.Where(i => i.Id != assigned.IssueId).ToList() };
    }
}
