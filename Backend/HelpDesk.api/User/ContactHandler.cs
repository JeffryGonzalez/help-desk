using Marten;

namespace HelpDesk.api.User;

public static class ContactHandler
{
    public static async Task HandleAsync(ModifyContactFirstName command, IDocumentSession session)
    {
        
        session.Events.Append(command.Id, new FirstNameUpdated(command.Value));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyContactLastName command, IDocumentSession session)
    {

        session.Events.Append(command.Id, new LastNameUpdated(command.Value));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyContactPhoneNumber command, IDocumentSession session)
    {

        session.Events.Append(command.Id, new PhoneNumberUpdated(command.Value));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyContactEmailAddress command, IDocumentSession session)
    {

        session.Events.Append(command.Id, new EmailAddressUpdated(command.Value));
        await session.SaveChangesAsync();
    }
}


