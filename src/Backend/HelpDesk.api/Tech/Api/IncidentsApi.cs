using HelpDesk.api.Tech.ReadModels;
using Marten;
using Wolverine;
using Wolverine.Http;
using Wolverine.Http.Marten;

namespace HelpDesk.api.Tech.Api;

public static class IncidentsApi
{
    [WolverinePut("api/techs/{techId:guid}/incidents/{id:guid}")]
    public static async Task<IResult> AssignIncidentToTech(
        AssignIncidentToTechRequest request,
        Guid techId,
        Guid id,
        [Document] UnassignedIncident incident,
        IMessageBus bus
        )
    {
        if (request.Version != incident.Version)
        {
            return TypedResults.Conflict();
        }
        await bus.InvokeAsync(new AssignIncidentToTech(id, techId));
        return TypedResults.Ok();
    }
}

public record AssignIncidentToTechRequest(Guid Id, int Version);

public record AssignIncidentToTech(Guid Id, Guid TechId);