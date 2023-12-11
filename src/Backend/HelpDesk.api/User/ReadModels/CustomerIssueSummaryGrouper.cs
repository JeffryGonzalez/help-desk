using HelpDesk.api.User.Api;
using Marten;
using Marten.Events;
using Marten.Events.Aggregation;
using Marten.Events.Projections;

namespace HelpDesk.api.User.ReadModels;

public class CustomerIssueSummaryGrouper : IAggregateGrouper<Guid>
{
    private readonly Type[] eventTypes =
    {
        typeof(IssueCreated)
    };
    public async Task Group(IQuerySession session, IEnumerable<IEvent> events, ITenantSliceGroup<Guid> grouping)
    {
        var filteredEvents = events.Where(ev => eventTypes.Contains(ev.EventType)).ToList();
        if (!filteredEvents.Any()) return;

        var incidentIds = filteredEvents.Select(e => e.StreamId).ToList();

        var result = await session.Events.QueryRawEventDataOnly<IssueCreated>()
            .Where(e => incidentIds.Contains(e.Id))
            .Select(x => new { x.Id, x.CustomerId })
            .ToListAsync();

        foreach (var group in result.Select(g => 
            new { g.CustomerId, Events = filteredEvents.Single(ev => ev.Id == g.Id) }))
        {
            grouping.AddEvent(group.CustomerId, group.Events);
        }


    }
}