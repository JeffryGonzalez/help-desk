import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { UserProfileStore } from '.';
import { ContactChannels, UserContactKey } from './types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="w-auto basis-full">
      <form>
        <div class="form-control">
          <label class="label" for="firstName"
            >First Name
            <span
              *ngIf="store.isSavingContactKey() === 'firstName'"
              class="loading loading-spinner text-success"
            ></span>
          </label>
          <input
            #fn
            [disabled]="store.isSavingContact()"
            data-testid="firstName"
            class="input input-bordered"
            type="text"
            id="firstName"
            name="firstName"
            [value]="store.contact.firstName()"
            [ngClass]="{ 'input-error': store.firstNameIsValid() === false }"
            (change)="change('firstName', fn.value)"
          />
        </div>
        <div class="form-control">
          <label class="label" for="lastName">Last Name</label>
          <input
            [disabled]="store.isSavingContact()"
            #ln
            data-testid="lastName"
            class="input input-bordered"
            type="text"
            id="lastName"
            name="lastName"
            [value]="store.contact.lastName()"
            [ngClass]="{ 'input-error': store.lastNameIsValid() === false }"
            (change)="change('lastName', ln.value)"
          />
        </div>
        <div class="form-control">
          <label class="label" for="contactChannel"
            >How do you like to be contacted:</label
          >

          <select
            #cm
            data-testid="contactChannel"
            [disabled]="store.isSavingContact()"
            class="select w-full select-bordered"
            id="contactChannel"
            name="contactChannel"
            [value]="store.contact.contactChannel()"
            (change)="change('contactChannel', cm.value)"
            [ngClass]="{
              'select-error': store.contactChannelIsValid() === false
            }"
          >
            <option disabled selected value="GeneratedBySystem">Preferred Contact Mechanism</option>
            @for(c of contactChannels(); track c) {
            <option [value]="c">
              {{ c }}
            </option>
            }
          </select>
        </div>
        <div class="form-control">
          <label class="label" for="emailAddress">Email Address</label>
          <input
            [disabled]="store.isSavingContact()"
            #em
            data-testid="emailAddress"
            class="input input-bordered"
            type="text"
            id="emailAddress"
            name="emailAddress"
            [value]="store.contact.emailAddress()"
            [ngClass]="{ 'input-error': store.contactEmailIsValid() === false }"
            (change)="change('emailAddress', em.value)"
          />
        </div>
        <div class="form-control">
          <label class="label" for="phoneNumber">Phone Number</label>
          <input
            [disabled]="store.isSavingContact()"
            #ph
            data-testid="phoneNumber"
            class="input input-bordered"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            [value]="store.contact.phoneNumber()"
            [ngClass]="{ 'input-error': store.contactPhoneIsValid() === false }"
            (change)="change('phoneNumber', ph.value)"
          />
        </div>
      </form>
      <a class="btn btn-primary" (click)="location.back()">Go Back</a>
    </div>
  `,
  styles: ``,
})
export class ProfileComponent implements OnInit  {
  store = inject(UserProfileStore);

 constructor(public readonly location:Location){}
  contactChannels: Signal<ContactChannels[]> = signal([
    'Email',
    'Phone',
    'InPerson',
  ]);
  change(key: UserContactKey, value: unknown) {
    this.store.setUserState(key, value);
  }
  ngOnInit(): void {
    
  }

 
}
