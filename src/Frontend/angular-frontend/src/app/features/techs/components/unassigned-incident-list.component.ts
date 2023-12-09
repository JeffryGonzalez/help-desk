import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { UnassignedIncidentsService, UnassignedIncidentsState } from '../services/unassigned-incidents.service';

@Component({
  selector: 'app-unassigned-incident-list',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  template: `
    @if(unassigned().isLoading) {
    <div class="loading loading-spinner loading-lg"></div>
    } @else { @for(i of unassigned().data; track i.id) {

    <details
      class="collapse collapse-arrow bg-base-200 mb-4"
      title="Click to See User"
    >
      <summary
        class="collapse-title text-xl font-medium"
        (click)="get(i.customerId)"
      >
        <p class="truncate">{{ i.description }}</p>
        <span class="text-sm block"
          >Logged {{ i.created | date : 'fullDate' }} ({{
            getHumanized(i.created)
          }}
          ago)</span
        >
      </summary>
      <div class="collapse-content p-4 bg-secondary-content ">
        <p>Description:</p>
        <div class="mx-4 font-mono m-4 border-r-2 border p-4 ">{{ i.description }}</div>
        @if(i.customerInfo) {
        <p>
          Logged By: {{ i.customerInfo.firstName }}
          {{ i.customerInfo.lastName }}
        </p>
        @if(i.customerInfo.contactChannel === 'Email') {
        <p>
          {{ i.customerInfo.firstName }} prefers to be contacted using Email:
          {{ i.customerInfo.emailAddress }}
        </p>
        } @else {
        <p>
          {{ i.customerInfo.firstName }} prefers to be contacted using Phone:
          {{ i.customerInfo.phoneNumber }}
        </p>
        } }
        <div class="mt-4">
          <button (click)="assign(i)" class="btn btn-accent btn-sm">Take This Issue</button>
        </div>
      </div>
    </details>

    } }
  `,
  styles: ``,
})
export class UnassignedIncidentListComponent {
  private readonly service = inject(UnassignedIncidentsService);
  unassigned = this.service.get().result;
  private getCustomerInfo = this.service.getContactForIncident();
  private assignIncident = this.service.assign();

  get(userId: string) {
    this.getCustomerInfo.mutate({ userId });
  }
  getHumanized(date: string) {
    return formatDistanceToNow(new Date(date));
  }

  assign(incident:UnassignedIncidentsState) {
    this.assignIncident.mutate({incident})
  }
}
