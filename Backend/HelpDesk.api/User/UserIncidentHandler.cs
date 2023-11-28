using Marten;

namespace HelpDesk.api.User;

public static class UserIncidentHandler
{
    public static async Task HandleAsync(CreateUserIncident command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new UserIncidentCreated(command.Id));
        await session.SaveChangesAsync();
    }
}
