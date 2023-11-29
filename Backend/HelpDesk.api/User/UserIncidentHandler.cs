using Marten;

namespace HelpDesk.api.User;

public static class UserIncidentHandler
{
    public static async Task<UserIncidentCreated> HandleAsync(CreateUserIncident command, IDocumentSession session)
    {
        var result = new UserIncidentCreated(command.IncidentId, DateTimeOffset.Now);
        session.Events.Append(command.Id,result );
        await session.SaveChangesAsync();
        return result;
    }

    public static async Task HandleAsync(UpdateDescriptionOfUserIncident command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new UserIncidentDescriptionUpdated(command.IncidentId, command.Description));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(DeleteUserIncident command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new UserIncidentDeleted(command.IncidentId));
        await session.SaveChangesAsync();
    }
}
