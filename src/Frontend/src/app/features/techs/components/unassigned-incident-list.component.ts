import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { UnassignedIncidentsService } from '../services/unassigned-incidents.service';

@Component({
  selector: 'app-unassigned-incident-list',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  template: `
   @if(unassigned().isLoading) {
    <div class="loading loading-spinner loading-lg"></div>
    } @else { @for(i of unassigned().data; track i.id) {

    <details class="collapse bg-base-200 mb-4" title="Click to See User">
      <summary
        class="collapse-title text-xl font-medium"
        (click)="get(i.customerId)"
      >
        {{ i.description }}
        <span class="text-sm block"
          >Logged {{ i.created | date : 'fullDate' }} ({{
            getHumanized(i.created)
          }}
          ago)</span
        >
        <div>
          <button class="btn btn-accent btn-sm">Take This Issue</button>
        </div>
      </summary>
      <div class="collapse-content">
        @if(i.customerInfo) {
        <p>{{ i.customerInfo.firstName }} {{ i.customerInfo.lastName }}</p>
        @if(i.customerInfo.contactChannel === 'Email') {
        <p>
          {{ i.customerInfo.firstName }} prefers to be contacted using Email:
          {{ i.customerInfo.emailAddress }}
        </p>
        } @else {
        <p>
          {{ i.customerInfo.firstName }} prefers to be contacted using Phone: {{
            i.customerInfo.phoneNumber
          }}
        </p>
        } }
      </div>
    </details>

    } }
  
  `,
  styles: ``
})
export class UnassignedIncidentListComponent {
 private readonly service = inject(UnassignedIncidentsService);
  unassigned = this.service.get().result;
  private getCustomerInfo = this.service.getContactForIncident();

  get(userId: string) {
    this.getCustomerInfo.mutate({ userId });
  }
  getHumanized(date: string) {
    return formatDistanceToNow(new Date(date));
  }
}
