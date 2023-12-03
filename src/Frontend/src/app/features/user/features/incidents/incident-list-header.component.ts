import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { filterSuccessResult } from '@ngneat/query';
import { tap } from 'rxjs';
import { UserProfileStore } from '../profile';
import { ProfileService } from '../profile/services';
import { RouterLink } from '@angular/router';
import { IncidentCreateComponent } from "./incident-create.component";

@Component({
  selector: 'app-incident-list-header',
  standalone: true,
  template: `
    
    @if(store.contactInvalid()) {
    <div class="alert alert-error">
      <p>You have not completed your profile. Please complete your profile.</p>
      <a class="btn btn-primary" [routerLink]="['/user/profile']"
        >Complete Profile</a
      >
    </div>
    } @else {
    <button (click)="create()" class="btn btn-primary btn-xs">
      Create Incident
    </button>
    <dialog #createModal class="modal">
      <app-incident-create (done)="done()" />
    </dialog>
    }
  `,
  styles: ``,
  imports: [RouterLink, IncidentCreateComponent],
})
export class IncidentListHeaderComponent implements OnInit {
  private readonly service = inject(ProfileService);
  store = inject(UserProfileStore);
  contact = this.service.getContact().result;

  @ViewChild('createModal') createModal!: ElementRef<HTMLDialogElement>;
  ngOnInit(): void {
    this.service
      .getContact()
      .result$.pipe(
        filterSuccessResult(),
        tap((result) => this.store.setUser(result.data))
      )
      .subscribe();
  }
  create() {
    this.createModal.nativeElement.showModal();
  }
  done() {
    this.createModal.nativeElement.close();
  }
}
