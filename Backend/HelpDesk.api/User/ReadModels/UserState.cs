using HelpDesk.api.Auth;
using Marten.Events.Aggregation;

namespace HelpDesk.api.User.ReadModels;

public record UserState
{
    public Guid Id { get; set; }
    public int Version { get; set; }

    public Contact ContactChannel { get; set; } = new Contact(ContactChannelType.GeneratedBySystem);
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
            FirstNameUpdated e => current with { ContactChannel = current.ContactChannel with { FirstName = e.Value } },
            LastNameUpdated e => current with { ContactChannel = current.ContactChannel with { LastName = e.Value } },
            PhoneNumberUpdated e => current with { ContactChannel = current.ContactChannel with { PhoneNumber = e.Value } },
            EmailAddressUpdated e => current with { ContactChannel = current.ContactChannel with { EmailAddress = e.Value } },
            _ => throw new Exception("Chaos")
        };
     
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
    string? FirstName = null,
    string? LastName = null,
    string? EmailAddress = null,
    string? PhoneNumber = null
);