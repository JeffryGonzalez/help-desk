import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StagedUserIncidentsService } from './services/staged-incident.service';
import { UserIncident } from './types';

@Component({
  selector: 'app-incident-item',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, JsonPipe],
  template: `
    <div>
    <p>
        Incident Created on {{ incident?.created | date : 'shortDate' }} at
        {{ incident?.created | date : 'shortTime' }}
      </p>
      <div class="form-control">
        <label class="label" for="description">Description</label>
        <textarea
          class="textarea textarea-bordered"
          #description
          (keyup)="change(description.value)"
          [value]="incident?.description || ''"
        ></textarea>
      </div>
      <div>
        <button
          (click)="update()"
          class="btn btn-primary"
          
        >
          Submit Incident
        </button>
        <a routerLink="/user/incidents" class="btn btn-primary">
          Save For Later
        </a>

        <button class="btn btn-error">Delete</button>
      </div>
      <div>
        <a [routerLink]="['..']" class="btn btn-link"> Go Back </a>
      </div>
      <pre> {{ incident | json }} </pre>
    </div>
  `,
  styles: ``,
  providers: [],
})
export class IncidentItemComponent implements OnInit {
  @Input() id = '';
  
  incident:UserIncident | undefined | null = null;
  private readonly service = inject(StagedUserIncidentsService);
  ngOnInit() {
    this.incident = this.service.getStagedIncident(this.id);

  }

  change(val:string) {}
  update() {}
  // store = inject(Store);
  // incident!: Signal<UserIncident | undefined>;
  // itemStore = inject(UserIncidentItemStore);
  // ngOnInit(): void {
  //   this.incident = this.store.selectSignal(
  //     UserIncidentFeature.getById(this.id)
  //   );
  //   // this.itemStore.setId(this.id);
  //   this.itemStore.setIncident(this.incident()!);
  // }
  // change(d: string) {
  //   this.itemStore.setDescription(d);
  // }

  // update() {
  //   console.log(this.itemStore.incident());
  // }
}
