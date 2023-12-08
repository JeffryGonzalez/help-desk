import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { filterSuccessResult } from '@ngneat/query';
import { tap } from 'rxjs';
import { UserProfileStore } from './features/profile';
import { ProfileService } from './features/profile/services/profie.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, JsonPipe],
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
  private readonly service = inject(ProfileService);
  store = inject(UserProfileStore);
  contact = this.service.getContact().result;

  ngOnInit(): void {
    this.service
      .getContact()
      .result$.pipe(
        filterSuccessResult(),
        tap((result) => this.store.setUser(result.data))
      )
      .subscribe();
  }
}
