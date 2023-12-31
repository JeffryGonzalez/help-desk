import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  template: ` <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" [routerLink]="['/profile']">Help Desk</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a routerLink="/user">Your User</a></li>
        <li><a routerLink="/techs">Techs</a></li>
        <li>
          <details #d>
            <summary>Account</summary>
            <ul class="p-2 bg-base-100">
              <li><a (click)="go('/user/profile', d)">Profile</a></li>
              <li><a href="/api/logout">Signout</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>`,
  imports: [RouterLink],
})
export class HeaderComponent {
  router = inject(Router);

  go(route: string, d: HTMLDetailsElement) {
    d.toggleAttribute('open');
    this.router.navigate([route]);
  }
}
