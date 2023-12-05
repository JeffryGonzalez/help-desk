using HelpDesk.api.Tech.ReadModels;
using Marten;
using Wolverine.Http;

namespace HelpDesk.api.Tech.Api;

public static class UnassignedIncidents
{
    [WolverineGet("/api/techs/unassigned-incidents")]
    public async static Task<IResult> GetUnassignedIncidents(IDocumentSession session)
    {
        var result = await session.Query<UnassignedIncident>().ToListAsync();
        return TypedResults.Ok(result);
    }
}
