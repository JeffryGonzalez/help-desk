using Duende.Bff;
using HelpDesk.api.Auth;
using HelpDesk.api.Auth.ReadModels;
using Marten;
using Marten.Events.Projections;
using Oakton;
using Wolverine;
using Wolverine.Http;
using Wolverine.Marten;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    WebRootPath = Path.Combine("wwwroot", "browser")
});

builder.Host.ApplyOaktonExtensions();
builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));
builder.Services.AddBff(options =>
{
    options.ManagementBasePath = "/api";
});
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "cookie";
    options.DefaultChallengeScheme = "oidc";
    options.DefaultSignOutScheme = "oidc";

}).AddCookie("cookie", options =>
{
    options.ExpireTimeSpan = TimeSpan.FromHours(8);
    options.SlidingExpiration = false;
    options.Cookie.Name = "__Host-issue-tracker";
    options.Cookie.SameSite = SameSiteMode.Strict;
}).AddOpenIdConnect("oidc", options =>
{
    options.EventsType = typeof(CustomOidcEventTypes);
});


var connectionString = builder.Configuration.GetConnectionString("database") ?? throw new Exception("We need a database");

builder.Services.AddMarten(options =>
{
    options.Connection(connectionString);
    options.Projections.Add<UserSummaryProjection>(ProjectionLifecycle.Inline);

}).UseLightweightSessions().IntegrateWithWolverine();

builder.Host.UseWolverine(opts =>
{
    opts.Policies.AutoApplyTransactions();
});

builder.Services.AddTransient<IUserService, CustomUserService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseBff();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapBffManagementEndpoints();
app.UseAuthorization();

if(app.Environment.IsDevelopment())
{
    app.MapReverseProxy();
}

app.MapWolverineEndpoints(opts =>
{
    opts.RequireAuthorizeOnAll();
});

return await app.RunOaktonCommands(args);
