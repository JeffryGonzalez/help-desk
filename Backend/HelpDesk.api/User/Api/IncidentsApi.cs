using HelpDesk.api.User.ReadModels;
using Marten;
using Wolverine;
using Wolverine.Http;
using Wolverine.Http.Marten;

namespace HelpDesk.api.User.Api;

public static class IncidentsApi
{
    [WolverinePost("/api/users/{id:guid}/incidents")]
    public static async Task<IResult> AddIncident(CreateUserIncidentRequest request, [Document] ContactState contact, Guid id, IDocumentSession session, IMessageBus bus)
    {

        var command = new CreateUserIncident(id, request.Id, contact);
        var response = await bus.InvokeAsync<CreatedUserIncident>(command);
        return TypedResults.Ok(response);

    }
}


public record CreateUserIncident(
    Guid CustomerId,
    Guid StagedIncidentId,
    ContactState Contact
    );
public record CreateUserIncidentRequest(
    Guid Id
    );

public record CreatedUserIncident(Guid Id);

public record IncidentLogged(
    Guid CustomerId,
    Guid LoggedBy,
    ContactState Contact);