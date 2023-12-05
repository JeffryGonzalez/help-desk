import { Component, inject } from '@angular/core';
import { UnassignedIncidentsService } from './services/unassigned-incidents.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { Signal } from '@ngrx/signals/src/deep-signal';
import { ProfileService } from '../user/features/profile/services';

@Component({
    selector: 'app-techs',
    standalone: true,
    template: `
   @if(unassigned().isLoading) {
    <div class="loading loading-spinner loading-lg"></div>
   } @else {
    @for(i of unassigned().data; track i.id) {
      <div class="pb-4">
        <p>{{ i.description }}</p>
        <p>{{ i.created | date:'fullDate' }}</p>
        @if(i.customerInfo === undefined) {
        <button (click)="get(i.customerId)" class="btn btn-primary">Get Customer Info</button>
        } @else {
        <div>
          <p>{{ i.customerInfo.firstName }} {{ i.customerInfo.lastName }}</p>
          <p>{{ i.customerInfo.emailAddress }}</p>
          <p>{{ i.customerInfo.phoneNumber }}</p>
        </div>
        }
        

      </div>
    }  
   }
  
  `,
    styles: ``,
    imports: [JsonPipe, DatePipe]
})
export class TechsComponent {
  private readonly service = inject(UnassignedIncidentsService);
  unassigned = this.service.get().result;
  private getCustomerInfo = this.service.getContactForIncident()

  get(userId: string) {
    this.getCustomerInfo.mutate({ userId })
  }
}
