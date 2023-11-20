var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    WebRootPath = Path.Combine("wwwroot", "browser")
});

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

});

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

app.Run();
