import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { pendingUserIncidentFeature } from './state/pending-incidents';
import { UserContact, userFeature } from './state';
import { PendingUserIncidentCommands } from './state/pending-incidents/actions';

@Component({
  standalone: true,
  template: `
    <div class="prose">
      <h3>Who should we contact about this issue?</h3>
      <p>The information stored in your profile is displayed here.</p>
    </div>
    <form>
      <div class="form-control">
        <label for="firstName" class="label">First Name:</label>
        <input
          type="text"
          id="firstName"
          #firstName
          [ngModel]="savedIncident()?.contact?.firstName"
          (change)="updateField('firstName', firstName.value)"
          name="firstName"
          class="input input-bordered"
          placeholder="First Name"
        />
      </div>
      <div class="form-control">
        <label for="lastName" class="label">Last Name:</label>
        <input
          type="text"
          #lastName
          id="lastName"
          [ngModel]="savedIncident()?.contact?.lastName"
          (change)="updateField('lastName', lastName.value)"
          name="lastName"
          class="input input-bordered"
          placeholder="Last Name"
        />
      </div>
      <div class="form-control">
        <label for="emailAddress" class="label">Email Address:</label>
        <input
          type="email"
          #email
          id="emailAddress"
          name="emailAddress"
          [ngModel]="savedIncident()?.contact?.emailAddress"
          (change)="updateField('emailAddress', email.value)"
          class="input input-bordered"
          placeholder="Email Address"
        />
      </div>
      <div class="form-control">
        <label for="phoneNumber" class="label">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          #phone
          [ngModel]="savedIncident()?.contact?.phoneNumber"
          (change)="updateField('firstName', phone.value)"
          name="phoneNumber"
          class="input input-bordered"
          placeholder="First Name"
        />
      </div>
      <a class="btn btn-info w-1/3" (click)="goNext()">Next</a>
    </form>
    <pre>{{ changed() }} </pre>
  `,
  imports: [FormsModule],
})
export class UserInicidentContactComponent implements OnInit {
  private readonly store = inject(Store);
  savedIncident = this.store.selectSignal(
    pendingUserIncidentFeature.selectCurrentIssue
  );

  changed = signal(false);
  updatedContactInfo: Partial<Omit<UserContact, 'id'>> = {};
  ngOnInit(): void {}
  goNext() {
    this.store.dispatch(
      PendingUserIncidentCommands.goToStep({
        payload: { step: 'review', id: this.savedIncident()?.id || '' },
      })
    );
  }
  updateField(field: keyof Omit<UserContact, 'id'>, value: any) {
    this.updatedContactInfo[field] = value;
    this.changed.set(true);
    this.store.dispatch(
      PendingUserIncidentCommands.updateIncidentContactInfo({
        payload: {
          id: this.savedIncident()?.id || '',
          changes: {
            [field]: value,
          },
        },
      })
    );
  }
}
