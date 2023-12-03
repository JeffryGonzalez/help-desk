﻿using Duende.Bff;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Wolverine;

namespace HelpDesk.api.Auth;

// TODO #1 Rename this. @JeffryGonzalez
public class CustomOidcEventTypes : BffOpenIdConnectEvents
{
    private readonly IMessageBus _bus;

    public CustomOidcEventTypes(ILogger<BffOpenIdConnectEvents> logger, IMessageBus bus) : base(logger)
    {
        _bus = bus;
    }
    public override async Task TokenValidated(TokenValidatedContext context)
    {
        var identity = context?.Principal?.Identity;
        if (context?.Principal is not null && identity is not null && identity.IsAuthenticated)
        {
            var sub = context.Principal.Claims.SingleOrDefault(c => c.Type == "sub");
            var iss = context.Principal.Claims.SingleOrDefault(c => c.Type == "iss")?.Value;
            if (sub is not null)
            {
                await _bus.PublishAsync(new ProcessLogin(sub.Value, iss ?? ""));

            }
        }

        await base.TokenValidated(context!);
    }
}
