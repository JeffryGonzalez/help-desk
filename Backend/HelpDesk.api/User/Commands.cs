namespace HelpDesk.api.User;

public abstract record UserContactInformationCommand(Guid Id, string Value)
{
    public record ModifyFirstName(Guid Id, string Value) : UserContactInformationCommand(Id, Value);
    public record ModifyLastName(Guid Id, string Value) : UserContactInformationCommand(Id, Value);
    public record ModifyEmailAddress(Guid Id, string Value) : UserContactInformationCommand(Id, Value);
    public record ModifyPhoneNumber(Guid Id, string Value) : UserContactInformationCommand(Id, Value);
    public record ModifyContactMechanism(Guid Id, string Value) : UserContactInformationCommand(Id, Value);
}



public abstract record StagedUserIncidentCommand(Guid Id)
{
    public record Create(Guid Id): StagedUserIncidentCommand(Id);
    public record UpdateDescription(Guid Id, Guid IncidentId, string Description): StagedUserIncidentCommand(Id);
    public record Delete(Guid Id, Guid IncidentId): StagedUserIncidentCommand(Id);
}