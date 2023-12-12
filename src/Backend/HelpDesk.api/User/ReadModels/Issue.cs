using HelpDesk.api.User.Api;
using Marten.Events;
using Marten.Events.Aggregation;
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