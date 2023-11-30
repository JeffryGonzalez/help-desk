import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StagedUserIncidentsService } from './services/staged-incident.service';
import { filterSuccessResult, injectIsMutating, tapSuccessResult } from '@ngneat/query';
import { filter, from, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [CommonModule, JsonPipe, RouterLink, DatePipe],
  template: `
    <p class="text-2xl">Unsubmitted Incidents</p>
    <button (click)="create()" class="btn btn-primary btn-xs">
      Create Incident
    </button>
    @if(incidents().isLoading) {
    <span class="loading loading-ring loading-lg"></span>
    } @if(incidents().data; as data) { @if(data.length === 0) {
    <p>You have no staged incidents.</p>
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
          <button class="btn btn-sm btn-primary">Submit</button>
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
  // private readonly isMutating = this.mutating().result$;
  incidents = this.service.getStagedIncidents().result;
  createIncident = this.service.create();
  deleteIncident = this.service.remove();
  
  delete(id: string) {
    this.deleteIncident.mutate({id});
   
  }
  create() {
    from(this.createIncident.mutateAsync({})).pipe(
      take(1),
      tap(({id}) => this.router.navigate(['user','incidents', id])),
    ).subscribe();
  }

  ngOnInit(): void {
  
  }
}
