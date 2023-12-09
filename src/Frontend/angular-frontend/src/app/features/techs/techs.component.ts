import { Component, inject } from '@angular/core';
import { UnassignedIncidentListComponent } from './components/unassigned-incident-list.component';
import { AuthService } from '@auth/auth.service';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-techs',
  standalone: true,
  template: `
  <p>You are a tech? {{ isTech().data | json }}</p>
    <div class="container mx-auto">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-1">
          <p class="font-extrabold text-2xl">Unassigned Incidents</p>
          <app-unassigned-incident-list></app-unassigned-incident-list>
        </div>
        <div class="col-span-1">
          <p class="font-extrabold text-2xl">Incidents Assigned To You</p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  imports: [UnassignedIncidentListComponent, JsonPipe],
})
export class TechsComponent {
  service = inject(AuthService);

  isTech = this.service.isTech().result;
  
}
