
## Backend

We configure the `WebApplication` to treat the `wwwroot/browser` directory as the "Web root":

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    WebRootPath = Path.Combine("wwwroot", "browser")
});
```

On the App, we tell it to `UseDefaultFiles`, which allows it to automatically serve the `index.html` generated application, and `UseStaticFiles`:

```csharp
app.UseDefaultFiles();
app.UseStaticFiles();
```

During Development, we use Yarp to proxy to our Angular application:

```csharp
if (app.Environment.IsDevelopment())
{
    app.MapReverseProxy();
}
```

The configuration for this is in `app.settings.json`:

```json
  "ReverseProxy": {
    "Routes": {
      "route1": {
        "ClusterId": "ng-dev",
        "Match": {
          "Path": "{**catch-all}"
        }
      }
    },
    "Clusters": {
      "ng-dev": {

        "Destinations": {
          "ng-dev/serve": {
            "Address": "http://localhost:4200/"
          }
        }
      }
    }
  }
```

#todo The Angular app should *probably* be served during development using HTTPs.
