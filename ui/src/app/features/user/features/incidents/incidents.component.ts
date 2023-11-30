import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StagedUserIncidentsService } from './services/staged-incident.service';

@Component({
    selector: 'app-incidents',
    standalone: true,
    template: `
   <div class="prose">
    <h1>Your Incidents</h1>
   </div>
   <section>

   </section>
   <section>
  <router-outlet />
   </section>
  `,
    styles: ``,
    imports: [CommonModule, RouterOutlet]
})
export class IncidentsComponent {


}
