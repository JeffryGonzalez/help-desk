using Marten;

namespace HelpDesk.api.User;

public static class ContactHandler
{
    public static async Task HandleAsync(ModifyContactInformation.ModifyContactFirstName command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new FirstNameUpdated(command.Value));
        await session.SaveChangesAsync();
    }
}

public record FirstNameUpdated(string Value);