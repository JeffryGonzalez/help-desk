import { DatePipe, JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { UnassignedIncidentsService } from './services/unassigned-incidents.service';
import {formatDistanceToNow} from 'date-fns'
import { UnassignedIncidentListComponent } from "./components/unassigned-incident-list.component";
@Component({
  selector: 'app-techs',
  standalone: true,
  template: `
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
  imports: [UnassignedIncidentListComponent],
})
export class TechsComponent {}
