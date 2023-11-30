using Marten;
using static HelpDesk.api.User.StagedUserIncidentCommand;
using static HelpDesk.api.User.UserStagedIncidentEvents;

namespace HelpDesk.api.User;

public static class StagedUserIncidentHandler
{
    public static async Task<UserIncidentCreated> HandleAsync(Create command, IDocumentSession session)
    {
        var result = new UserIncidentCreated(Guid.NewGuid(), DateTimeOffset.Now);
        session.Events.Append(command.Id,result );
        await session.SaveChangesAsync();
        return result;
    }

    public static async Task HandleAsync(UpdateDescription command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new UserIncidentDescriptionUpdated(command.IncidentId, command.Description));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(Delete command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new UserIncidentDeleted(command.IncidentId));
        await session.SaveChangesAsync();
    }
}
