using HelpDesk.api.Auth;
using Marten.Events.Aggregation;
using static HelpDesk.api.User.UserContactEvent;
namespace HelpDesk.api.User.ReadModels;

public record ContactState
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string EmailAddress { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    public ContactChannelType ContactChannel { get; set; } = ContactChannelType.GeneratedBySystem;
}

public class UserContactStateProjection : SingleStreamProjection<ContactState>
{
    public ContactState Create(UserCreated @event)
    {
        return new ContactState { Id = @event.Id, Version = 1 };
    }
    public ContactState Apply(UserContactEvent @event, ContactState current)
    {

        return @event switch
        {
            FirstNameUpdated e => current with { FirstName = e.Value, Version = current.Version++ },
            LastNameUpdated e => current with { LastName = e.Value, Version = current.Version++ } ,
            PhoneNumberUpdated e => current with { PhoneNumber = e.Value, Version = current.Version++ } ,
            EmailAddressUpdated e => current with { EmailAddress = e.Value, Version = current.Version++ },
            ContactMechanismUpdated e => current with  { ContactChannel = e.Value, Version = current.Version++ } ,
            _ => throw new Exception("Chaos")
        } ;

    }
}

public enum ContactChannelType
{
    Email,
    Phone,
    InPerson,
    GeneratedBySystem
}