using Duende.Bff;
using HelpDesk.api.Auth.ReadModels;
using Marten;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace HelpDesk.api.Auth;

public class CustomUserService(IOptions<BffOptions> options, ILoggerFactory loggerFactory, IQuerySession session)
    : DefaultUserService(options, loggerFactory)
{
    private Guid _userId;

    public override async Task ProcessRequestAsync(HttpContext context)
    {
        var identity = context.User.Identity;
        if (identity is not null && identity.IsAuthenticated)
        {
            var sub = context.User.Claims.SingleOrDefault(c => c.Type == "sub");

            if (sub is not null)
            {
                var user = await session.Query<AuthSummary>().SingleOrDefaultAsync(u => u.Sub == sub.Value);
                if (user is not null)
                {
                    _userId = user.Id;
                }
            }
        }

        await base.ProcessRequestAsync(context);
    }


    protected override IEnumerable<ClaimRecord> GetUserClaims(AuthenticateResult authenticateResult)
    {
        var claims = base.GetUserClaims(authenticateResult);
        var streamId = new ClaimRecord("stream_id", _userId);
        return [streamId, .. claims];
    }
}
