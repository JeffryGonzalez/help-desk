using HelpDesk.api.Auth;
using Marten.Events.Aggregation;
using static HelpDesk.api.User.UserStagedIncidentEvents;

namespace HelpDesk.api.User.ReadModels;

public record StagedUserIncidentsState
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public IReadOnlyList<StagedUserIncident> Incidents { get; set; } = [];


}

public class StagedUserIncidentsProjections : SingleStreamProjection<StagedUserIncidentsState>
{
   public StagedUserIncidentsState Create(UserCreated @event)
    {
        return new StagedUserIncidentsState
        {
            Id = @event.Id,
            Version = 1,
            Incidents = []
        };
    }

    public StagedUserIncidentsState Apply(UserIncidentCreated @event, StagedUserIncidentsState current)
    {
        var toAdd = new StagedUserIncident(@event.Id, @event.Created);
        return current with { Version = current.Version++, Incidents = [toAdd, .. current.Incidents] };
    }

    public StagedUserIncidentsState Apply(UserIncidentDescriptionUpdated @event, StagedUserIncidentsState current)
    {
        var found = current.Incidents.Single(i => i.Id == @event.Id);
        var updated = found with { Description = @event.Description };
        var newIncidents = current.Incidents.Where(i => i.Id != @event.Id).ToList();
        return current with { Incidents = [updated, .. newIncidents] };
    }

    public StagedUserIncidentsState Apply(UserIncidentDeleted @event, StagedUserIncidentsState current)
    {
        return current with { Incidents = current.Incidents.Where(i => i.Id != @event.Id).ToList() };
    }
}

public record StagedUserIncident(
    Guid Id,
    DateTimeOffset Created,
    string Description = "");