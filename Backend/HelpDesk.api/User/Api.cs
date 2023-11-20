using HelpDesk.api.User.ReadModels;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Wolverine.Http.Marten;
using Get = Wolverine.Http.WolverineGetAttribute;
namespace HelpDesk.api.User;

public static class Api
{
    [Get("api/users/{id:guid}")]
    public static IResult Get([Document] UserState response)
    {
        return TypedResults.Ok(response);
    }
}
