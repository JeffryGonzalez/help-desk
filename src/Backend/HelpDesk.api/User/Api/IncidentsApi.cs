using HelpDesk.api.Tech.ReadModels;
using HelpDesk.api.User.ReadModels;
using Marten;
using Wolverine;
using Wolverine.Http;
using Wolverine.Http.Marten;

namespace HelpDesk.api.User.Api;

public static class IncidentsApi
{
    [WolverineGet("/api/users/{id:guid}/incidents")]
    public static IResult GetIncidents(Guid id, [Document] CustomerIncidents response)
    {
        if (response is null)
        {
            return TypedResults.Ok(new { Incidents = Array.Empty<int>() });
        }
        else
        {
            return TypedResults.Ok(response);
        }
    }
    [WolverinePost("/api/users/{id:guid}/incidents")]
    public static async Task<IResult> AddIncident(CreateUserIncidentRequest request, Guid id, IDocumentSession session, IMessageBus bus)
    {

        var command = new CreateUserIncident(id, request.Description);
        var response = await bus.InvokeAsync<CreatedUserIncident>(command);
        return TypedResults.Redirect($"/api/users/{id}/incidents/{response.Id}");

    }
    [WolverineGet("/api/users/{userId:guid}/incidents/{id:guid}")]
    public static async Task< IResult> GetIncidentById(Guid userId, Guid id, IDocumentSession session)
    {
        var doc = await session.Query<UnassignedIncident>().Where(i => i.Id == id && i.CustomerId == userId).SingleOrDefaultAsync();
        if(doc is not null)
        {
            return TypedResults.Ok(doc);
        } else
        {
            return TypedResults.NotFound();
        }
    }
}


public record CreateUserIncident(
    Guid CustomerId,
    string Description
    );
public record CreateUserIncidentRequest(
    string Description
    );

public record CreatedUserIncident(Guid Id, string Description, IncidentStatus Status = IncidentStatus.Pending);


public record IncidentLogged(
    Guid CustomerId,
    Guid LoggedBy,
    Contact Contact);