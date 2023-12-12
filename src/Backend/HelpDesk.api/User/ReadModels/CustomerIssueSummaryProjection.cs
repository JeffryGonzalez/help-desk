using HelpDesk.api.User.Api;
using Marten.Events;
using Marten.Events.Projections;

namespace HelpDesk.api.User.ReadModels;

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