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
        return TypedResults.Ok(response);
    }
    [WolverinePost("/api/users/{id:guid}/incidents")]
    public static async Task<IResult> AddIncident(CreateUserIncidentRequest request, Guid id, IDocumentSession session, IMessageBus bus)
    {

        var command = new CreateUserIncident(id, request.Description);
        var response = await bus.InvokeAsync<CreatedUserIncident>(command);
        return TypedResults.Ok(response);

    }
}


public record CreateUserIncident(
    Guid CustomerId,
    string Description
    );
public record CreateUserIncidentRequest(
    string Description
    );

public record CreatedUserIncident(Guid Id, string Description);

public record IncidentLogged(
    Guid CustomerId,
    Guid LoggedBy,
    ContactState Contact);