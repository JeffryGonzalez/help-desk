using HelpDesk.api.User.ReadModels;
using Wolverine;
using Wolverine.Http;
using Wolverine.Http.Marten;
using static HelpDesk.api.User.UserContactInformationCommand;
namespace HelpDesk.api.User.Api;

public static class ContactApi
{

    [WolverineGet("api/users/{id:guid}/contact")]
    public static IResult Get([Document] ContactState response)
    {
        return TypedResults.Ok(response);
    }

    [WolverinePut("/api/users/{id:guid}/contact/{op:required}")]
    public static async Task<IResult> ChangeContact(PropertyModificationRequest request, Guid id, string op, IMessageBus bus, HttpContext context)
    {
        UserContactInformationCommand cmd = op switch
        {
            "first-name" => new ModifyFirstName(id, request.Value),
            "last-name" => new ModifyLastName(id, request.Value),
            "email-address" => new ModifyEmailAddress(id, request.Value),
            "phone-number" => new ModifyPhoneNumber(id, request.Value),
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

