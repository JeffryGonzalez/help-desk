using HelpDesk.api.User.ReadModels;

namespace HelpDesk.api.Incidents;


public record IncidentLogged(
    Guid CustomerId,
    ContactState Contact,
    string Description,
    Guid LoggedBy);