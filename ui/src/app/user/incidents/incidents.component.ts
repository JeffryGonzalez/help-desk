import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="prose">
    <h1>Your Incidents</h1>
   </div>
  `,
  styles: ``
})
export class IncidentsComponent {

}
