namespace HelpDesk.api.User;

public abstract record ModifyContactInformation(Guid Id, string Value);
public record ModifyContactFirstName(Guid Id, string Value) : ModifyContactInformation(Id, Value);
public record ModifyContactLastName(Guid Id, string Value) : ModifyContactInformation(Id, Value);
public record ModifyContactEmailAddress(Guid Id, string Value) : ModifyContactInformation(Id, Value);
public record ModifyContactPhoneNumber(Guid Id, string Value) : ModifyContactInformation(Id, Value);

public record ModifyContactMechanism(Guid Id, string Value): ModifyContactInformation(Id, Value);