using HelpDesk.api.User.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Security.Cryptography.Xml;
using Wolverine;
using Wolverine.Http.Marten;
using Get = Wolverine.Http.WolverineGetAttribute;
using Put = Wolverine.Http.WolverinePutAttribute;
using Post = Wolverine.Http.WolverinePostAttribute;
namespace HelpDesk.api.User;

public static class Api
{
    
    [Get("api/users/{id:guid}")]
    public static IResult Get([Document] UserState response)
    {
        return TypedResults.Ok(response);
    }

    [Post("/api/users/{id:guid}/incidents")]
    public static async Task<IResult> CreateIncident(Guid id, IMessageBus bus)
    {
        var command = new CreateUserIncident(id);
        await bus.InvokeAsync(command);
        return Results.Ok(command);
    }

    [Put("/api/users/{id:guid}/{op:required}")]
    public static async Task<IResult> PutFirstName(ContactModificationRequest request, Guid id, IMessageBus bus, string op, HttpContext context) 
    {
        ModifyContactInformation cmd = op switch
        {
            "first-name" => new ModifyContactFirstName(id, request.Value),
            "last-name" => new ModifyContactLastName(id, request.Value),
            "email-address" => new ModifyContactEmailAddress(id, request.Value),
            "phone-number" => new ModifyContactPhoneNumber(id, request.Value),
            "contact-channel" => new ModifyContactMechanism(id, request.Value),
            _ => throw new BadHttpRequestException("invalid path")
        }; ;
       
       
        await bus.PublishAsync(cmd);
        return TypedResults.Accepted(context.Request.Path);
    }

}

public record ContactModificationRequest
{
    public string Value { get; set; } = string.Empty;
}

