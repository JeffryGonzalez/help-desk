using HelpDesk.api.User.Api;
using HelpDesk.api.User.ReadModels;
using Marten;

namespace HelpDesk.api.Incidents.Handlers;

public class CustomerIncidentHandler
{
    public static async Task<CreatedUserIncident> Handle(CreateUserIncident command, IDocumentSession session)
    {
        var id = Guid.NewGuid();
        var @event = new IncidentLogged(id,command.CustomerId, command.Description, command.CustomerId);
        session.Events.Append(id, @event);
        await session.SaveChangesAsync();
        return new CreatedUserIncident(id, command.Description);
    }
}
