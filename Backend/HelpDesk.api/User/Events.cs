namespace HelpDesk.api.User;

public record UserContactEvent { };
public record FirstNameUpdated(string Value) : UserContactEvent;
public record LastNameUpdated(string Value) : UserContactEvent;
public record EmailAddressUpdated(string Value) : UserContactEvent;
public record PhoneNumberUpdated(string Value) : UserContactEvent;