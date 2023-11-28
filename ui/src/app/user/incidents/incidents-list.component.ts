import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { UserIncidentsStore } from './user-incident.store';
import { Store } from '@ngrx/store';
import { UserIncidentFeature } from './state';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
  <p>Your Unsubmitted Incidents</p>
    <!-- @for(i of incidents(); track i.id) {
      <p> {{ i.id}} {{ i.description }} </p>
    } -->

    <pre>{{ incidents() | json }}</pre>
  `,
  styles: ``
})
export class IncidentsListComponent {
  private readonly store = inject(Store);

  incidents = this.store.selectSignal(UserIncidentFeature.selectIds);
}
