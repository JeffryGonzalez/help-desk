import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserStore } from './profile';
import { Store } from '@ngrx/store';
import { UserFeature } from './state';
import { UserContactFeature } from './profile/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { UserService } from './user.service';
import { intersectResults } from '@ngneat/query';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, JsonPipe],
  template: `
    <section class="relative">
      <div class="flex flex-row">
        <div class="basis-1/6 flex">
          <!-- <pre>{{ contact | json }}</pre> -->
          <button (click)="doit()">Do it</button>"
          <nav>
            <ul>
              <!-- <li>
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
              </li> -->
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
export class UserComponent implements OnInit {
  private readonly service = inject(UserService);
  user = this.service.getUser().result;

  ngOnInit(): void {}
  doit() {
    const contact = this.service.getContact();
    console.log('contact', contact);
  }
}
