using HelpDesk.api.User.ReadModels;

namespace HelpDesk.api.Incidents;


public record IncidentLogged(
    Guid Id,
    Guid CustomerId,
    string Description,
    Guid LoggedBy);