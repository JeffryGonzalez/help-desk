# Help Desk

## Steps

- Created new empty ASP.NET Core API - .NET 8, enabled HTTPS (4c660dc83aab1f9ea2ac611da27a45881451d503)
- Created Angular App (7234d8dd4e9e5375da5d015a9225d2f961bd3ae2)
    - `npm i -g @angular/cli@latest`
    - `ng new frontend --skip-tests --skip-git`
        - CSS
        - no SSR
- Add Yarp.ReverseProxy package and configure reverse proxy
- Create `dev-environment`
    - Local auth is with `mock-oauth2-server` at port 9999
    - Postgres 15.5-bullseye
        - user is user, password is password
        - create a database called `issuetracker` on init.
    - Adminer added to see database at port 9090
- Added BFF and OpenId Configuration to API
- Frontend - added NGRX Libs (they are legacy peer deps - will update to 17 when available)



## References

- https://github.com/oskardudycz/EventSourcing.NetCore/tree/main/Sample/Helpdesk

