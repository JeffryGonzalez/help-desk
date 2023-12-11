using HelpDesk.api.User.ReadModels;
using Marten;
using Wolverine;
using Wolverine.Http;
using Wolverine.Http.Marten;
using static HelpDesk.api.User.UserContactEvent;
using static HelpDesk.api.User.UserContactInformationCommand;
namespace HelpDesk.api.User.Api;

public static class ContactApi
{
    [WolverinePost("api/users/{id:guid}/contact")]
    public static async Task<IResult> CreateProfile(Guid id, CreateContactProfileRequest request, [Document] Contact contact, IDocumentSession session)
    {
        if(contact is not null)
        {
            return TypedResults.Conflict();
        } else
        {
            var @event = new CreatedContactProfile(id, request.FirstName, request.LastName, request.EmailAddress, request.PhoneNumber, request.ContactChannel);
           session.Events.Append(id, @event);
            await session.SaveChangesAsync();
            return TypedResults.Ok(@event);
        }
    }

    [WolverineGet("api/users/{id:guid}/contact")]
    public static IResult Get(Guid id, [Document] Contact response)
    {
        if (response is not null)
        {
            return TypedResults.Ok(response);
        } else
        {

            return TypedResults.NotFound();
        }
    }

    //[WolverinePut("/api/users/{id:guid}/contact/{op:required}")]
    //public static async Task<IResult> ChangeContact(PropertyModificationRequest request, Guid id, string op, IMessageBus bus, HttpContext context)
    //{
    //    UserContactInformationCommand cmd = op switch
    //    {
    //        "first-name" => new ModifyFirstName(id, request.Value),
    //        "last-name" => new ModifyLastName(id, request.Value),
    //        "email-address" => new ModifyEmailAddress(id, request.Value),
    //        "phone-number" => new ModifyPhoneNumber(id, request.Value),
    //        "contact-channel" => new ModifyContactMechanism(id, request.Value),
    //        _ => throw new BadHttpRequestException("invalid path")
    //    }; ;


    //    await bus.PublishAsync(cmd);
    //    return TypedResults.Accepted(context.Request.Path);
    //}
}


public record PropertyModificationRequest
{
    public string Value { get; set; } = string.Empty;
}


public record CreateContactProfileRequest(string FirstName, string LastName, string EmailAddress, string PhoneNumber, ContactChannelType ContactChannel);