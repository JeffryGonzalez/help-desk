import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { UserIncidentsStore } from './user-incident.store';
import { Store } from '@ngrx/store';
import { UserIncidentFeature } from './state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [CommonModule, JsonPipe, RouterLink, DatePipe],
  template: `
  <p>Your Unsubmitted Incidents</p>
  @if(incidents() !== undefined) {
    @for(i of incidents(); track i?.id) {
     <a class="btn btn-link" [routerLink]="[i?.id]">Created on {{i?.created | date }}</a>
    }
  }

  `,
  styles: ``
})
export class IncidentsListComponent {
  private readonly store = inject(Store);

  incidents = this.store.selectSignal(UserIncidentFeature.all);
}
