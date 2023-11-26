import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserStore } from './profile';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `

    <section class="relative">
      <div class="flex flex-row">
        <div class="basis-1/6 flex">
          <nav>
            <ul>
              <li>
                @if(store.contactInvalid()) {
                <div class="indicator">
                  <span class="indicator-item badge badge-success"
                    >Start Here</span
                  >
                  <div class="grid place-items-center">
                    <a
                      routerLink="profile"
                      class="btn btn-nav btm-nav-sm w-full mb-2"
                      >Your Profile</a
                    >
                  </div>
                </div>
                } @else {
                <a
                  routerLink="profile"
                  class="btn btn-nav btm-nav-sm w-full mb-2"
                  >Your Profile</a
                >
                }
              </li>
              <li>
                <a
                  [ngClass]="{
                    'pointer-events-none': store.contactInvalid(),
                    'brightness-50': store.contactInvalid()
                  }"
                  routerLink="incidents"
                  class="btn btn-nav btm-nav-sm w-full mb-2"
                >
                  Incidents</a
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="flex basis-auto w-full">
          <router-outlet></router-outlet>
        </div>
      </div>
    </section>
        
  `,
  styles: ``,
})
export class UserComponent {
  store = inject(UserStore);
  loading  = this.store.loading();
  constructor() {
  }
}
