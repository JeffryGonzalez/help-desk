import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { filterSuccessResult, injectIsMutating } from '@ngneat/query';
import { tap } from 'rxjs';
import { IncidentListHeaderComponent } from './incident-list-header.component';
import { IncidentListStore } from './services/incident-list.store';
import { IncidentsService } from './services/incidents.service';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    RouterLink,
    DatePipe,
    IncidentListHeaderComponent,
  ],
  template: `
    <app-incident-list-header />
    <!-- <pre> {{ listStore.incidentEntities() | json }} </pre> -->
    @if(incidents().isLoading) {
    <span class="loading loading-ring loading-lg"></span>
    } @if(listStore.incidentEntities(); as data) { @if( data.length === 0) {
    <p>You have no incidents.</p>
    } @else { @for(i of data; track i.id) {

    <div class="card  bg-base-200 shadow-xl mb-4">
      <div class="card-body ">
        <p>{{ i.description }}</p>
        <p>
          Created on {{ i.created | date : 'shortDate' }} at
          {{ i.created | date : 'shortTime' }}
        </p>
        <div class="card-actions justify-end">
          <button
            [disabled]="i.status !== 'Pending'"
            (click)="delete(i.id)"
            class="btn btn-sm btn-error"
          >
            Cancel Pending Incident
          </button>
        </div>
      </div>
    </div>
    } } }
  `,
  styles: ``,
  providers: [IncidentListStore],
})
export class IncidentsListComponent {
  private readonly service = inject(IncidentsService);
  private readonly mutating = injectIsMutating();
  listStore = inject(IncidentListStore);
  incidents = this.service.get().result;

  delete(id: string) {
    // this.deleteStagedIncident.mutate({ id });
    // const c = this.listStore.
  }

  constructor() {
    this.service
      .get()
      .result$.pipe(
        filterSuccessResult(),
        takeUntilDestroyed(),
        tap((result) => this.listStore.setIncidents(result.data))
      )
      .subscribe();
  }
}
