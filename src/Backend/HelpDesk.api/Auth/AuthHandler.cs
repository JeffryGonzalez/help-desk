﻿using HelpDesk.api.Auth.ReadModels;
using Marten;

namespace HelpDesk.api.Auth;

public class AuthHandler
{

    public static async Task HandleAsync(ProcessLogin command, IDocumentSession session)
    {
        var user = await session.Query<AuthSummary>().Where(u => u.Sub == command.Sub).SingleOrDefaultAsync(); // TODO #2 Add an Index for this query. @JeffryGonzalez
        if (user is null)
        {
            var newId = Guid.NewGuid();
            session.Events.Append(newId, new UserCreated(newId, command.Sub, command.Authority));
        }
        else
        {
            session.Events.Append(user.Id, new UserLoggedIn(user.Id, command.Authority));
        }

        await session.SaveChangesAsync();
    }
}