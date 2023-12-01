import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StagedUserIncidentsService } from './services/staged-incident.service';
import { UserIncident } from './types';
import { IncidentItemStore } from './services/incident-item.store';
import { from, take, tap } from 'rxjs';

@Component({
  selector: 'app-incident-item',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, JsonPipe],
  template: `
    <div>
      <p>
        Incident Created on {{ item.created() | date : 'shortDate' }} at
        {{ item.created() | date : 'shortTime' }}
      </p>
      <div class="form-control">
        <label class="label" for="description">Description</label>
        <textarea
          class="textarea textarea-bordered"
          #description
          (change)="change(description.value)"
          [value]="item.description() || ''"
        ></textarea>
      </div>
      <div>
        <button
          [disabled]="item.isInvalid()"
          (click)="update()"
          class="btn btn-primary"
        >
          Submit Incident
        </button>
        <a routerLink="/user/incidents" class="btn btn-primary">
          Save For Later
        </a>

        <button (click)="delete()" class="btn btn-error">Delete</button>
      </div>
      <div>
        <a [routerLink]="['..']" class="btn btn-link"> Go Back </a>
      </div>

    </div>
  `,
  styles: ``,
  providers: [IncidentItemStore],
})
export class IncidentItemComponent implements OnInit {
  @Input() id = '';
  item = inject(IncidentItemStore);
  service = inject(StagedUserIncidentsService);

  private deleteIncident = this.service.remove();
  private readonly router = inject(Router);
  ngOnInit() {
    const incident = this.service.getStagedIncident(this.id);
    this.item.setIncident(incident!);
  }

  change(val: string) {
    this.item.changeDescription(val);
  }
  update() {}
  delete() {
    from(this.deleteIncident.mutateAsync({ id: this.id })).pipe(
      take(1),
      tap(() => this.router.navigate(['user', 'incidents']))
    ).subscribe();
  }
}
