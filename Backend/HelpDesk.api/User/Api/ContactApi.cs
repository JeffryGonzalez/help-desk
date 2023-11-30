using HelpDesk.api.User.ReadModels;
using System;
using Wolverine;
using Wolverine.Http;
using Wolverine.Http.Marten;

namespace HelpDesk.api.User.Api;

public static class ContactApi
{
    /*[Get("api/users/{id:guid}")]
    public static IResult Get([Document] UserState response)
    {
        return TypedResults.Ok(response);
    }*/
    [WolverineGet("api/users/{id:guid}/contact")]
    public static IResult Get([Document] ContactState response)
    {
        return TypedResults.Ok(response);
    }

    [WolverinePut("/api/users/{id:guid}/contact/{op:required}")]
    public static async Task<IResult> ChangeContact(PropertyModificationRequest request, Guid id, string op, IMessageBus bus, HttpContext context)
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


public record PropertyModificationRequest
{
    public string Value { get; set; } = string.Empty;
}

