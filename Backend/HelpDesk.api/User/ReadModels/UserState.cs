using HelpDesk.api.Auth;
using Marten.Events.Aggregation;

namespace HelpDesk.api.User.ReadModels;

public record UserState
{
    public Guid Id { get; set; }
    public int Version { get; set; }

    public Contact Contact { get; set; } = new Contact(ContactChannelType.GeneratedBySystem);
}

public class UserStateProjection : SingleStreamProjection<UserState>
{
    public UserState Create(UserCreated @event)
    {
        return new UserState
        {
            Id = @event.Id,
            Version = 1
        };
    }

    public UserState Apply(UserContactEvent @event, UserState current) {

        return @event switch
        {
            FirstNameUpdated e => current with { Contact = current.Contact with { FirstName = e.Value } },
            LastNameUpdated e => current with { Contact = current.Contact with { LastName = e.Value } },
            PhoneNumberUpdated e => current with { Contact = current.Contact with { PhoneNumber = e.Value } },
            EmailAddressUpdated e => current with { Contact = current.Contact with { EmailAddress = e.Value } },
            ContactMechanismUpdated e => current with { Contact = current.Contact with { ContactChannel = e.Value } },
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
public record Contact(
    ContactChannelType ContactChannel,
    string FirstName = "",
    string LastName = "",
    string EmailAddress = "",
    string PhoneNumber = ""
);