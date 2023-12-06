using HelpDesk.api.Incidents;
using HelpDesk.api.Tech;
using Marten;
using Marten.Events;
using Marten.Events.Projections;

namespace HelpDesk.api.User.ReadModels;

public record CustomerIncidents
{
    public Guid Id { get; set; }
    public IList<Incident> Incidents { get; set; } = [];
}

public class CustomerIncidentSummaryProjection : MultiStreamProjection<CustomerIncidents, Guid>
{
    public CustomerIncidentSummaryProjection()
    {
        Identity<IncidentLogged>(e => e.CustomerId);
    }

    public  CustomerIncidents Apply(IEvent<IncidentLogged> logged, CustomerIncidents current)
    {
        
        var newIncident = new Incident(logged.Id, logged.Data.Description, IncidentStatus.Pending, logged.Timestamp);
        return current with { Incidents = [newIncident, .. current.Incidents] };
    }
    public CustomerIncidents Apply(IncidentAssignedToTech @event, CustomerIncidents current)
    {
        var original = current.Incidents.Single(i => i.Id == @event.Id);
        var updated = original with { Status = IncidentStatus.Assigned };
        var newIncidents = current.Incidents.Where(i => i.Id != @event.Id).ToList() ;
        newIncidents.Add(updated);
        return current with { Incidents = newIncidents };
    }
}

public enum IncidentStatus
{
    Pending = 1,
    Assigned,
    Resolved = 8,
    ResolutionAcknowledgedByCustomer = 16,
    Closed = 32
}
public record Incident(Guid Id, string Description, IncidentStatus Status, DateTimeOffset Created );