using HelpDesk.api.User.ReadModels;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Wolverine;
using Wolverine.Http.Marten;
using Get = Wolverine.Http.WolverineGetAttribute;
using Put = Wolverine.Http.WolverinePutAttribute;
namespace HelpDesk.api.User;

public static class Api
{
    [Get("api/users/{id:guid}")]
    public static IResult Get([Document] UserState response)
    {
        return TypedResults.Ok(response);
    }

    [Put("/api/users/{id:guid}/first-name")]
    public static async Task<ModifyContactInformation> PutFirstName(ContactModificationRequest request, Guid id, IMessageBus bus) 
    {
        var command = new ModifyContactInformation.ModifyContactFirstName(id, request.Value);
        await bus.PublishAsync(command);
        return command;
    }
}

public record ContactModificationRequest
{
    public string Value { get; set; } = string.Empty;
}

public record ModifyContactInformation(Guid Id, string Value)
{
    public record ModifyContactFirstName(Guid Id, string Value): ModifyContactInformation(Id, Value);
}