import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserIncident, UserIncidentFeature } from './state';
import { UserIncidentItemStore } from './incident-item.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incident-item',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, JsonPipe],
  template: `
    <div>
      <p>
        Incident Created on {{ incident()?.created | date : 'shortDate' }} at
        {{ incident()?.created | date : 'shortTime' }}
      </p>
      <div class="form-control">
        <label class="label" for="description">Description</label>
        <textarea
          class="textarea textarea-bordered"
          #description
          (keyup)="change(description.value)"
          [value]="incident()?.description || ''"
        ></textarea>
      </div>
      <div>
        <button
          (click)="update()"
          class="btn btn-primary"
          [disabled]="!itemStore.ready()"
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
      <pre> {{ itemStore.incident() | json }} </pre>
    </div>
  `,
  styles: ``,
  providers: [UserIncidentItemStore],
})
export class IncidentItemComponent implements OnInit {
  @Input() id = '';

  store = inject(Store);
  incident!: Signal<UserIncident | undefined>;
  itemStore = inject(UserIncidentItemStore);
  ngOnInit(): void {
    this.incident = this.store.selectSignal(
      UserIncidentFeature.getById(this.id)
    );
    // this.itemStore.setId(this.id);
    this.itemStore.setIncident(this.incident()!);
  }
  change(d: string) {
    this.itemStore.setDescription(d);
  }

  update() {
    console.log(this.itemStore.incident());
  }
}
