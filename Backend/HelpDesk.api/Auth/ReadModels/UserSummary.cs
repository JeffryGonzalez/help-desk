using Marten.Events.Aggregation;

namespace HelpDesk.api.Auth.ReadModels;

public class UserSummary
{
    public Guid Id { get; set; }
    public DateTimeOffset LastLogin { get; set; }
    public string Sub { get; set; } = string.Empty;
    public int Logins { get; set; }
    public int Version { get; set; }
    public string Authority { get; set; } = string.Empty;

}

public class UserSummaryProjection : SingleStreamProjection<UserSummary>
{

    public UserSummary Create(UserCreated @event)
    {
        return new UserSummary
        {
            Id = @event.Id,
            LastLogin = DateTimeOffset.Now,
            Sub = @event.Sub,
            Logins = 1,
            Version = 1,
            Authority = @event.Authority
        };

    }
    public void Apply(UserLoggedIn @event, UserSummary model)
    {
        model.Logins++;
        model.Version++;
        model.Authority = @event.Authority;
        model.LastLogin = DateTimeOffset.Now;
    }
}
