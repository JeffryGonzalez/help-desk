using HelpDesk.api.Tech.Api;
using Marten;

namespace HelpDesk.api.Tech;

public static class IncidentsHandler
{
    public static async Task HandleAsync(AssignIncidentToTech command, IDocumentSession session)
    {
        session.Events.Append(command.Id, new IncidentAssignedToTech(command.Id, command.TechId));
        await session.SaveChangesAsync();
    }
}

public record IncidentAssignedToTech(Guid Id, Guid TechId);
