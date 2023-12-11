using HelpDesk.api.User.ReadModels;

namespace HelpDesk.api.User;

public abstract record UserContactEvent
{
    public record CreatedContactProfile(Guid Id, string FirstName, string LastName, string EmailAddress, string PhoneNumber, ContactChannelType ContactChannel);
    public record FirstNameUpdated(string Value) : UserContactEvent;
    public record LastNameUpdated(string Value) : UserContactEvent;
    public record EmailAddressUpdated(string Value) : UserContactEvent;
    public record PhoneNumberUpdated(string Value) : UserContactEvent;
    public record ContactMechanismUpdated(ContactChannelType Value) : UserContactEvent;
};

public abstract record UserStagedIncidentEvents
{
    public record UserIncidentCreated(Guid Id, DateTimeOffset Created, string Description = "") : UserStagedIncidentEvents;
    public record UserIncidentDescriptionUpdated(Guid Id, string Description) : UserStagedIncidentEvents;

    public record UserIncidentDeleted(Guid Id) : UserStagedIncidentEvents;
}