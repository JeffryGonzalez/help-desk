import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  template: ` <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" [routerLink]="['/profile']">Help Desk</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a routerLink="/create-incident">Create Incident</a></li>
        <li>
          <details>
            <summary>Account</summary>
            <ul class="p-2 bg-base-100">
              <li><a routerLink="/profile">Profile</a></li>
              <li><a href="/api/logout">Signout</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>`,
  imports: [RouterLink]
})
export class HeaderComponent {}