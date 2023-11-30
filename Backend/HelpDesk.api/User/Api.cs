//using HelpDesk.api.User.ReadModels;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
//using System.Security.Cryptography.Xml;
//using Wolverine;
//using Wolverine.Http.Marten;
//using Get = Wolverine.Http.WolverineGetAttribute;
//using Put = Wolverine.Http.WolverinePutAttribute;
//using Post = Wolverine.Http.WolverinePostAttribute;
//using Delete = Wolverine.Http.WolverineDeleteAttribute;
//namespace HelpDesk.api.User;

//public static class ApiX
//{
    


//    [Post("/api/users/{id:guid}/incidents")]
//    public static async Task<IResult> CreateIncident(Guid id, IMessageBus bus)
//    {
//        var command = new CreateUserIncident(id, Guid.NewGuid());
//        var result = await bus.InvokeAsync<UserIncidentCreated>(command);
//        return Results.Ok(result);
//    }

//    [Delete("/api/users/{id:guid}/incidents/{incidentId:guid}/")]
//    public static async Task<IResult> DeleteUserIncident(Guid id, Guid incidentId, IMessageBus bus, HttpContext context)
//    {
//        var command = new DeleteUserIncident(id, incidentId);
//        await bus.InvokeAsync(command);
//        return TypedResults.Accepted(context.Request.Path);
//    }

    
//    [Put("/api/users/{id:guid}/incidents/{incidentId:guid}/description")]
//    public static async Task<IResult> UpdateUserIncidentDescription(PropertyModificationRequest request, Guid id, Guid incidentId, IMessageBus bus)
//    {
//        var command = new UpdateDescriptionOfUserIncident(id, incidentId, request.Value);
//        await bus.InvokeAsync(command);
//        return TypedResults.Ok(command);
//    }

//    [Put("/api/users/{id:guid}/{op:required}")]
//    public static async Task<IResult> PutFirstName(PropertyModificationRequest request, Guid id, IMessageBus bus, string op, HttpContext context) 
//    {
//        ModifyContactInformation cmd = op switch
//        {
//            "first-name" => new ModifyContactFirstName(id, request.Value),
//            "last-name" => new ModifyContactLastName(id, request.Value),
//            "email-address" => new ModifyContactEmailAddress(id, request.Value),
//            "phone-number" => new ModifyContactPhoneNumber(id, request.Value),
//            "contact-channel" => new ModifyContactMechanism(id, request.Value),
//            _ => throw new BadHttpRequestException("invalid path")
//        }; ;
       
       
//        await bus.PublishAsync(cmd);
//        return TypedResults.Accepted(context.Request.Path);
//    }

//}

//public record PropertyModificationRequest
//{
//    public string Value { get; set; } = string.Empty;
//}

