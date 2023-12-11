using FluentValidation;
using HelpDesk.api.Auth;
using Marten.Events.Aggregation;
using static HelpDesk.api.User.UserContactEvent;
namespace HelpDesk.api.User.ReadModels;

public record Contact
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string EmailAddress { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    public ContactChannelType ContactChannel { get; set; } = ContactChannelType.GeneratedBySystem;
    public bool IsValid { get; set; } = false;
    public IReadOnlyList<string>? ValidationErrors { get; set; } = null;
}

public class ContactValidator : AbstractValidator<Contact>
{
    public ContactValidator()
    {
        RuleFor(c => c.FirstName).NotEmpty();
        RuleFor(c => c.LastName).NotEmpty();
        RuleFor(c => c.ContactChannel).NotEqual(ContactChannelType.GeneratedBySystem);
        RuleFor(c => c.EmailAddress).EmailAddress();
        RuleFor(c => c.EmailAddress).NotEmpty().When(c => c.ContactChannel == ContactChannelType.EmailAddress);
        RuleFor(c => c.PhoneNumber).NotEmpty().When(c => c.ContactChannel == ContactChannelType.PhoneNumber);


    }

}

public class ContactProjection : SingleStreamProjection<Contact>
{
    public Contact Create(CreatedContactProfile @event)
    {
      
        var contact = new Contact { Id = @event.Id, Version = 1, FirstName = @event.FirstName, LastName = @event.LastName, EmailAddress = @event.EmailAddress, ContactChannel = @event.ContactChannel, PhoneNumber = @event.PhoneNumber };

        var (isValid, errors) = ValidationErrors(contact);
        return contact with { ValidationErrors = errors, IsValid = isValid };
    }
    public Contact Apply(UserContactEvent @event, Contact current)
    {

        var updated = @event switch
        {
            FirstNameUpdated e => current with { FirstName = e.Value, Version = current.Version++ },
            LastNameUpdated e => current with { LastName = e.Value, Version = current.Version++ },
            PhoneNumberUpdated e => current with { PhoneNumber = e.Value, Version = current.Version++ },
            EmailAddressUpdated e => current with { EmailAddress = e.Value, Version = current.Version++ },
            ContactMechanismUpdated e => current with { ContactChannel = e.Value, Version = current.Version++ },
            _ => throw new Exception("Chaos")
        };

        var (isValid, errors) = ValidationErrors(updated);

        return updated with { ValidationErrors = errors, IsValid = isValid };

    }

    public static (bool, IReadOnlyList<string>?) ValidationErrors(Contact contact)
    {

        var validator = new ContactValidator();
        var result = validator.Validate(contact);

        if (result.IsValid)
        {
            return (true, null);
        }
        else
        {
            return (false, result.Errors.Select(e => e.ErrorMessage).ToList());
        }
    }
}

public enum ContactChannelType
{
    EmailAddress,
    PhoneNumber,
    GeneratedBySystem
}

