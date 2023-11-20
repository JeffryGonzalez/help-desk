using Marten.Events.Aggregation;

namespace HelpDesk.api.Auth.ReadModels;

public class AuthSummary
{
    public Guid Id { get; set; }
    public DateTimeOffset LastLogin { get; set; }
    public string Sub { get; set; } = string.Empty;
    public int Version { get; set; }
    public string Authority { get; set; } = string.Empty;

}

public class AuthSummaryProjection : SingleStreamProjection<AuthSummary>
{

    public AuthSummary Create(UserCreated @event)
    {
        return new AuthSummary
        {
            Id = @event.Id,
            LastLogin = DateTimeOffset.Now,
            Sub = @event.Sub,
            Version = 1,
            Authority = @event.Authority
        };

    }
    public void Apply(UserLoggedIn @event, AuthSummary model)
    {
 
        model.Version++;
        model.Authority = @event.Authority;
        model.LastLogin = DateTimeOffset.Now;
    }
}
