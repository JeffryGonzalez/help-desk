using HelpDesk.api.User.ReadModels;
using Marten;
using Microsoft.AspNetCore.Http.HttpResults;
using Wolverine.Http;
using Wolverine.Http.Marten;

namespace HelpDesk.api.User.Api;

public static class IssuesApi
{
    [WolverinePost("api/users/{id:guid}/issues")]
    public static async Task<IResult> CreateAnIssue(Guid id, CreateIssueRequest request, IDocumentSession session)
    {
        var issueId = Guid.NewGuid();
        session.Events.Append(issueId, new IssueCreated(issueId, id, request.Description));
        await session.SaveChangesAsync();
        return TypedResults.LocalRedirect($"/api/users/{id}/issues/{issueId}");
    }

    [WolverineGet("/api/users/{userId:guid}/issues/{id:guid}")]
    public static IResult GetAnIssue(Guid id, [Document] Issue response, Guid userId)
    {
        if(response is not null)
        {
            return TypedResults.Ok(response);
        } else
        {
            return TypedResults.NotFound();
        }
    }

    [WolverineGet("/api/users/{id:guid}/issues")]
    public static IResult GetIssues(Guid Id, [Document] CustomerIssueSummary response)
    {
        return TypedResults.Ok(response?.Issues ?? []);
    }
}

public record CreateIssueRequest
{
    public string Description { get; set; } = string.Empty;
}

public record IssueCreated(Guid Id, Guid CustomerId, string Description);
