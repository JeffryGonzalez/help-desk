import { Component, OnInit, inject } from '@angular/core';
import { filterSuccessResult } from '@ngneat/query';
import { tap } from 'rxjs';
import { UserProfileStore } from '../profile';
import { ProfileService } from '../profile/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incident-list-header',
  standalone: true,
  imports: [RouterLink],
  template: `
  @if(store.contactInvalid()) {
  <div class="alert alert-error">
    <p>You have not completed your profile. Please complete your profile.</p>
    <a class="btn btn-primary" [routerLink]="['/user/profile']">Complete Profile</a>
  </div>
  }
  `,
  styles: ``,
})
export class IncidentListHeaderComponent implements OnInit {
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
