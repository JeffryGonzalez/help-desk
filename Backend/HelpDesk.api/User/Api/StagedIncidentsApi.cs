using HelpDesk.api.User.ReadModels;
using Wolverine;
using Wolverine.Http;
using Wolverine.Http.Marten;
using static HelpDesk.api.User.StagedUserIncidentCommand;
using static HelpDesk.api.User.UserStagedIncidentEvents;

namespace HelpDesk.api.User.Api;

public static class StagedIncidentsApi
{
    [WolverineGet("api/users/{id:guid}/staged-incidents")]
    public static IResult Get([Document] StagedUserIncidentsState response)
    {
        return TypedResults.Ok(response);
    }

    [WolverinePost("/api/users/{id:guid}/staged-incidents")]
    public static async Task<IResult> CreateIncident(Guid id, IMessageBus bus)
    {
        var command = new Create(id);
        var result = await bus.InvokeAsync<UserIncidentCreated>(command);
        return Results.Ok(result);
    }
}
