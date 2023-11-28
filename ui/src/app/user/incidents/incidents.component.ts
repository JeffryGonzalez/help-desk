import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserIncidentCommands } from './state/actions';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-incidents',
    standalone: true,
    template: `
   <div class="prose">
    <h1>Your Incidents</h1>
   </div>
   <section>
   <button (click)="create()" class="btn btn-primary">Create Incident</button>
   </section>
   <section>
  <router-outlet />
   </section>
  `,
    styles: ``,
    imports: [CommonModule, RouterOutlet]
})
export class IncidentsComponent {
private readonly store = inject(Store);

create() {
  this.store.dispatch(UserIncidentCommands.create());
}
}
