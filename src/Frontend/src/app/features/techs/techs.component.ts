import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UnassignedIncidentsService } from './services/unassigned-incidents.service';

@Component({
  selector: 'app-techs',
  standalone: true,
  template: `
    @if(unassigned().isLoading) {
    <div class="loading loading-spinner loading-lg"></div>
    } @else { @for(i of unassigned().data; track i.id) {

    <details class="collapse bg-base-200 mb-4">
      <summary
        class="collapse-title text-xl font-medium"
        (click)="get(i.customerId)"
      >
        {{ i.description }}
        <span class="text-sm">{{ i.created | date : 'fullDate' }}</span>
        <div>
          <button class="btn btn-accent btn-sm">Take This Issue</button>
        </div>
      </summary>
      <div class="collapse-content">
        @if(i.customerInfo) {
        <p>{{ i.customerInfo.firstName }} {{ i.customerInfo.lastName }}</p>
        <p>{{ i.customerInfo.emailAddress }}</p>
        <p>{{ i.customerInfo.phoneNumber }}</p>
        }
      </div>
    </details>

    } }
  `,
  styles: ``,
  imports: [JsonPipe, DatePipe],
})
export class TechsComponent {
  private readonly service = inject(UnassignedIncidentsService);
  unassigned = this.service.get().result;
  private getCustomerInfo = this.service.getContactForIncident();

  get(userId: string) {
    this.getCustomerInfo.mutate({ userId });
  }
}
