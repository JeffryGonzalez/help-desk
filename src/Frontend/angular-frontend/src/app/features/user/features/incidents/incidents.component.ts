import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IncidentsListComponent } from "./incidents-list.component";
import { DetailsComponent } from "./incident-details.component";

@Component({
    selector: 'app-incidents',
    standalone: true,
    template: `
    
    <section class="flex">
      <app-incidents-list class="basis-1/2"></app-incidents-list>
      <app-incident-details></app-incident-details>
    </section>
  `,
    styles: ``,
    imports: [CommonModule, RouterOutlet, IncidentsListComponent, DetailsComponent]
})
export class IncidentsComponent {
  create() {

  }
}
