namespace HelpDesk.api.Auth;

public record UserCreated(Guid Id, string Sub, string Authority);
public record UserLoggedIn(Guid Id, string Authority);