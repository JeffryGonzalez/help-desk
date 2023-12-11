using HelpDesk.api.User.ReadModels;
using Marten;
using static HelpDesk.api.User.UserContactEvent;
using static HelpDesk.api.User.UserContactInformationCommand;

namespace HelpDesk.api.User;

public static class ContactHandler
{
    public static async Task HandleAsync(CreateContactProfile command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new CreatedContactProfile(command.Id, command.FirstName, command.LastName, command.EmailAddress, command.PhoneNumber, command.ContactChannel));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyFirstName command, IDocumentSession session)
    {
        
        session.Events.Append(command.Id, new FirstNameUpdated(command.Value));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyLastName command, IDocumentSession session)
    {

        session.Events.Append(command.Id, new LastNameUpdated(command.Value));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyPhoneNumber command, IDocumentSession session)
    {

        session.Events.Append(command.Id, new PhoneNumberUpdated(command.Value));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyEmailAddress command, IDocumentSession session)
    {

        session.Events.Append(command.Id, new EmailAddressUpdated(command.Value));
        await session.SaveChangesAsync();
    }
    public static async Task HandleAsync(ModifyContactMechanism command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new ContactMechanismUpdated(Enum.Parse<ContactChannelType>(command.Value)));
        await session.SaveChangesAsync();
    }
}


