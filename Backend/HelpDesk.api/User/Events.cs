using HelpDesk.api.User.ReadModels;

namespace HelpDesk.api.User;

public record UserContactEvent { };
public record FirstNameUpdated(string Value) : UserContactEvent;
public record LastNameUpdated(string Value) : UserContactEvent;
public record EmailAddressUpdated(string Value) : UserContactEvent;
public record PhoneNumberUpdated(string Value) : UserContactEvent;

public record ContactMechanismUpdated(ContactChannelType Value): UserContactEvent;


public record UserIncidentCreated(Guid Id, DateTimeOffset Created);
public record UserIncidentDescriptionUpdated(Guid Id, string Description);

public record UserIncidentDeleted(Guid Id);