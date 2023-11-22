import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import {
  IconErrorComponent,
  IconCheckComponent,
} from '../components/icons.component';
import { Store } from '@ngrx/store';
import { pendingUserIncidentFeature } from './state/pending-incidents';
import { UserContact, userFeature } from './state';
import { JsonPipe, NgIf } from '@angular/common';
import { camelToTitleCase } from '../utils';

type Error = {
  [Key in keyof UserContact]?: {
    messages: string[];
  };
};

@Component({
  selector: 'app-user-incident-review',
  standalone: true,
  template: `
    @if(incident()) {
    <section>
      <div class="card  bg-base-100 shadow-xl w-full">
        <div class="card-body">
          <div class="card  bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">
                <span class="text-green-500">
                  <app-icon-check />
                </span>
                Incident Description
              </h2>
              <p>{{ incident()?.description }}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary btn-xs">Edit</button>
              </div>
            </div>
            <div class="card bg-base-100 shadow-xl mt-6">
              <div class="card-body">
                <h2 class="card-title">
                  <span class="text-red-500">
                    <app-icon-error />
                  </span>
                  Follow-up Contact Information
                </h2>
                <div class="overflow-x-auto">
                  <table class="table">
                    <!-- head -->
                    <thead>
                      <tr>
                        <th></th>
                        <th>Field</th>
                        <th>Value</th>
                        <th>Save To Profile</th>
                      </tr>
                    </thead>
                    <tbody>
  
                      @for(key of contactKeys; track key) { 

                      <tr class="bg-base-200">
                        <td>
                          @if(!contactHasError(key)) {
                          <span class="text-green-500 text-xs">
                            <app-icon-check />
                          </span>
                          } @else {
                          <span class="text-red-500 text-xs">
                            <app-icon-error />
                          </span>

                          }
                        </td>

                        <td>{{cct(key)}}</td>
                        <td>{{ getIncidentByKey(key)}}</td>
                        <td>
                          @if(valueMatched(key)) {
                          <span>Same</span>
                          } @else {

                          <input
                            *ngIf="contactHasError(key) === false"
                            title="checking this will save this to your profile"
                            type="checkbox"
                            class="toggle toggle-success toggle-sm"
                          />
                          }
                        </td>
                      </tr>
                        }
                    
                    </tbody>
                  </table>
                  <div class="m-4">
                    @for(key of contactKeys; track key) { @if(errors()[key]) {
                    @for(message of errors()[key]?.messages; track message) {
                    <p class="text-red-500">{{ message }}</p>
                    } } }
                  </div>
                </div>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary btn-xs">Edit</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Submit</button>
            <button class="btn btn-primary">Save For Later</button>
          </div>
        </div>
      </div>
    </section>
    <pre>{{ errors() | json }}</pre>
    }
  `,
  imports: [IconErrorComponent, IconCheckComponent, NgIf, JsonPipe],
})
export class UserIssueReviewComponent implements OnInit {
  private readonly store = inject(Store);
  incident = this.store.selectSignal(
    pendingUserIncidentFeature.selectCurrentIssue
  );
  user = this.store.selectSignal(userFeature.selectContactChannel);
  errors: Signal<Error> = computed(() => {
    let errors: Error = {};
    for (const key of this.contactKeys) {
      const messages = this.isContactValid(key);
      if (messages.length > 0) {
        errors[key] = {
          messages,
        };
      }
    }
    return errors;
  });
  cct = camelToTitleCase;
  getIncidentByKey(key: keyof UserContact) {
    return this.incident()?.contact?.[key]!;
  }

  contactHasError(key: keyof UserContact) {
    return !!this.errors()[key];
  }
  contactKeys: (keyof UserContact)[] = [
    'firstName',
    'lastName',
    'emailAddress',
    'phoneNumber',
  ];
  valueMatched(key: keyof UserContact): boolean {
    return this.incident()?.contact?.[key] === this.user()?.[key];
  }
  ngOnInit(): void {}
  isContactValid(key: keyof UserContact) {
    switch (key) {
      case 'firstName':
        return this.doValidationFor(key, 'First Name', [validatesRequired]);
      case 'lastName':
        return this.doValidationFor(key, 'Last Name', [validatesRequired]);
      case 'emailAddress':
        return this.doValidationFor(key, 'Email Address', [
          validatesRequired,
          validatesEmailAddress,
        ]);
      default:
        return [];
    }

    function validatesRequired(value: any): string | undefined {
      if (typeof value === 'string') {
        return value.trim() !== '' ? undefined : 'Required';
      }
      return value !== undefined && value !== null ? undefined : 'Required';
    }

    function validatesEmailAddress(value: string): string | undefined {
      return value.includes('@') ? undefined : 'Must be a valid email address';
    }
  }

  private doValidationFor(
    key: keyof UserContact,
    fieldName: string,
    validators: ((value: any) => string | undefined)[]
  ) {
    let messages: string[] = [];
    for (const validator of validators) {
      const validation = validator(this.incident()?.contact?.[key]);
      if (validation) {
        messages.push(`${fieldName} ${validation}}`);
      }
    }
    return messages;
  }
}
