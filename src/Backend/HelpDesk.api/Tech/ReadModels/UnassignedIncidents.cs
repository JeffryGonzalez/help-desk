using HelpDesk.api.Incidents;
using Marten.Events;
using Marten.Events.Projections;

namespace HelpDesk.api.Tech.ReadModels;

public record UnassignedIncident
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public string Description { get; set; } = string.Empty;
    public Guid CustomerId { get; set; }
    public DateTimeOffset Created { get; set; }
}

public class UnassignedTechIncidentsProjection : MultiStreamProjection<UnassignedIncident, Guid>
{
    public UnassignedTechIncidentsProjection()
    {
        Identity<IncidentLogged>(e => e.Id);
    }

    public UnassignedIncident Create(IEvent<IncidentLogged> logged)
    {
        return new UnassignedIncident
        {
            Id = logged.Data.Id,
            Version = 1,
            Created = logged.Timestamp,
            CustomerId = logged.Data.CustomerId,
            Description = logged.Data.Description
        };
    }

}