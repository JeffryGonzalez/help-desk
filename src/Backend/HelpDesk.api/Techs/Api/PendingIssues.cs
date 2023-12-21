using HelpDesk.api.Techs.ReadModels;
using Marten;
using Microsoft.AspNetCore.Mvc;
using Wolverine.Http;

namespace HelpDesk.api.Techs.Api;

public static class PendingIssuesApi
{
    [WolverinePost("/api/techs/{id:guid}/issues/current")]
    public static async Task<IResult> AddAnIssue(Guid id, [FromBody] IssueRequestModel model, IDocumentSession session)
    {
        session.Events.Append(model.Id, new IssueAssignedToTech(model.Id, id));
        await session.SaveChangesAsync();
        return TypedResults.NoContent();
    }
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

public record IssueRequestModel
{
    public Guid Id { get; set; }
}

public record IssueAssignedToTech(Guid IssueId, Guid TechId);