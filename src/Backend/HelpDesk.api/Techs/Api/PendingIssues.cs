using HelpDesk.api.Techs.ReadModels;
using Marten;
using Wolverine.Http;

namespace HelpDesk.api.Techs.Api;

public static class PendingIssuesApi
{
    [WolverineGet("api/techs/pending-issues")]
    public static async Task<IResult> GetPendingIssues(IQuerySession session)
    {
        var x = await session.LoadAsync<PendingIssueSummary>(1);

        if (x is null)
        {
            return TypedResults.Ok();
        }
        else
        {
            return TypedResults.Ok(x);
        }
    }
    
}