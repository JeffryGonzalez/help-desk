import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { injectIsMutating } from '@ngneat/query';
import { from, take, tap } from 'rxjs';
import { IncidentsService } from './services/incidents.service';
import { StagedUserIncidentsService } from './services/staged-incident.service';
import { IncidentListHeaderComponent } from './incident-list-header.component';

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
    @if(incidents().isLoading) {
    <span class="loading loading-ring loading-lg"></span>
    } @if(incidents().data; as data) { @if(data.length === 0) {
    <p>You have no incidents.</p>
    } @else { @for(i of data; track i.id) {

    <div class="card  bg-base-200 shadow-xl mb-4">
      <div class="card-body ">
        @if(i?.description) {
        <p>{{ i?.description }}</p>
        } @else {
        <p>No Description Yet</p>
        }
        <p>
          Created on {{ i?.created | date : 'shortDate' }} at
          {{ i?.created | date : 'shortTime' }}
        </p>
        <div class="card-actions justify-end">
          <a [routerLink]="[i!.id]" class="btn btn-sm btn-primary">Edit</a>
          <button (click)="delete(i!.id)" class="btn btn-sm btn-error">
            Delete
          </button>
          @if(i?.description) {
          <button (click)="submit(i.id)" class="btn btn-sm btn-primary">
            Submit
          </button>
          }
        </div>
      </div>
    </div>
    } } }
  `,
  styles: ``,
})
export class IncidentsListComponent implements OnInit {
  private readonly service = inject(StagedUserIncidentsService);
  private readonly router = inject(Router);
  private readonly mutating = injectIsMutating();

  incidents = this.service.getStagedIncidents().result;
  createStagedIncident = this.service.create();
  deleteStagedIncident = this.service.remove();
  createIncident = inject(IncidentsService).create();

  delete(id: string) {
    this.deleteStagedIncident.mutate({ id });
  }
  create() {
    from(this.createStagedIncident.mutateAsync({}))
      .pipe(
        take(1),
        tap(({ id }) => this.router.navigate(['user', 'pending-incidents', id]))
      )
      .subscribe();
  }

  ngOnInit(): void {}
  submit(id: string) {
    this.createIncident.mutate({ id });
  }
}
