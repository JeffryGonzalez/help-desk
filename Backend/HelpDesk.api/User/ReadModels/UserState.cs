using HelpDesk.api.Auth;
using Marten.Events;
using Marten.Events.Aggregation;

namespace HelpDesk.api.User.ReadModels;

public record UserState
{
    public Guid Id { get; set; }
    public int Version { get; set; }

    public Contact Contact { get; set; } = new Contact(ContactChannelType.GeneratedBySystem);
    public List<UserIncident> UserIncidents { get; set; } = [];
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
    public UserState Apply(UserIncidentCreated @event, UserState current)
    {
        var newIncident = new UserIncident(@event.Id, @event.Created);
        return current with { UserIncidents = [newIncident, .. current.UserIncidents] };
    }
    public UserState Apply(UserIncidentDescriptionUpdated @event, UserState current)
    {
        var incident = current.UserIncidents.Single(i => i.Id == @event.Id);
        incident = incident with { Description = @event.Description };
        var updatedIncidents = current.UserIncidents.Where(i => i.Id != @event.Id).ToList();
        updatedIncidents.Add(incident);
        return current with { UserIncidents = updatedIncidents };
    }

    public UserState Apply(UserIncidentDeleted @event, UserState current)
    {
        return current with { UserIncidents = current.UserIncidents.Where(i => i.Id != @event.Id).ToList() };
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

public record UserIncident(
    Guid Id,
    DateTimeOffset Created,
    string Description = ""
    );