import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [CommonModule, JsonPipe, RouterLink, DatePipe],
  template: `
    <p class="text-2xl">Unsubmitted Incidents</p>
    <p>These incidents have not been submitted yet.</p>
    <!-- @if(incidents() !== undefined) { @for(i of incidents(); track i?.id) {

    <div class="card  bg-base-100 shadow-xl">
      <div class="card-body">
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
          <button (click)="delete(i!.id )" class="btn btn-sm btn-error">Delete</button>
          @if(i?.description) {
          <button class="btn btn-sm btn-primary">Submit</button>
          }
        </div>
      </div>
    </div> -->
    <!-- } } -->
  `,
  styles: ``,
})
export class IncidentsListComponent {
  
  delete(id: string) {
    //this.store.dispatch(UserIncidentCommands.delete({payload: {id}}));
  }
}