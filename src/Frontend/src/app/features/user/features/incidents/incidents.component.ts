import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-incidents',
    standalone: true,
    template: `
   <div class="prose">
    <h1>Your Incidents</h1>
   </div>
   <section>
  <router-outlet />
   </section>
  `,
    styles: ``,
    imports: [CommonModule, RouterOutlet]
})
export class IncidentsComponent {


}
