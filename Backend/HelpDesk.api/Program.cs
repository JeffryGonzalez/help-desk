var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    WebRootPath = Path.Combine("wwwroot", "browser")
});

builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();


if(app.Environment.IsDevelopment())
{
    app.MapReverseProxy();
}

app.Run();
