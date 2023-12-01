using HelpDesk.api.User.Api;
using HelpDesk.api.User.ReadModels;
using Marten;

namespace HelpDesk.api.Incidents.Handlers;

public class CustomerIncidentHandler
{
    public static async Task<CreatedUserIncident> Handle(CreateUserIncident command, IDocumentSession session)
    {
        // look up the staged incident.
        var staged = await session.Query<StagedUserIncidentsState>().Where(i => i.Id == command.CustomerId).SingleOrDefaultAsync();
        if(staged is null)
        {
            throw new Exception("Chaos - no saved incident with this id for the user");
        }

        var incident = staged.Incidents.Single(i => i.Id == command.StagedIncidentId);

       // var response = new CreatedUserIncident(Guid.NewGuid());
        var @event = new IncidentLogged(command.CustomerId, command.Contact, incident.Description, command.CustomerId);
        var streamId = session.Events.StartStream(@event);
        await session.SaveChangesAsync();
        return new CreatedUserIncident(streamId.Id);
    }
}
