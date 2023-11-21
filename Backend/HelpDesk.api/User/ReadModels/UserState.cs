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

    public UserState Apply(FirstNameUpdated @event, UserState current)
    {
       
        return current with { ContactChannel = current.ContactChannel with { FirstName = @event.Value } };
       
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