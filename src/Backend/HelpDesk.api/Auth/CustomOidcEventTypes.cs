using Duende.Bff;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Wolverine;

namespace HelpDesk.api.Auth;

// TODO #1 Rename this. @JeffryGonzalez
public class CustomOidcEventTypes(ILogger<BffOpenIdConnectEvents> logger, IMessageBus bus)
    : BffOpenIdConnectEvents(logger)
{
    public override async Task TokenValidated(TokenValidatedContext context)
    {
        var identity = context?.Principal?.Identity;
        if (context?.Principal is not null && identity is not null && identity.IsAuthenticated)
        {
            var sub = context.Principal.Claims.SingleOrDefault(c => c.Type == "sub");
            var iss = context.Principal.Claims.SingleOrDefault(c => c.Type == "iss")?.Value;
            var isTech = context.Principal.Claims.Any(c => c is { Type: "roles", Value: "tech" });
            if (sub is not null)
            {
                await bus.PublishAsync(new ProcessLogin(sub.Value, iss ?? "", isTech));

            }
        }

        await base.TokenValidated(context!);
    }
}
