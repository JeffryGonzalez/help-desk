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
        return TypedResults.Ok(response.Incidents);
    }

    [WolverinePost("/api/users/{id:guid}/staged-incidents")]
    public static async Task<IResult> CreateIncident(Guid id, IMessageBus bus)
    {
        var command = new Create(id);
        var result = await bus.InvokeAsync<UserIncidentCreated>(command);
        return Results.Ok(result);
    }
    [WolverinePut("/api/users/{id:guid}/staged-incidents/{incidentId:guid}/description")]
    public static async Task<IResult> UpdateDescription(PropertyModificationRequest request, Guid id, Guid incidentId, IMessageBus bus)
    {
        var cmd = new UpdateDescription(id, incidentId, request.Value);
        await bus.InvokeAsync(cmd);
        return TypedResults.Ok();
    }
    [WolverineDelete("/api/users/{id:guid}/staged-incidents/{incidentId:guid}")]
    public static async Task<IResult> DeleteStaged(Guid id, Guid incidentId, IMessageBus bus)
    {
        var cmd = new Delete(id, incidentId);
        await bus.InvokeAsync(cmd);
        return TypedResults.Ok();
    }
}
