import { Component, Input, OnInit, Signal, inject, signal,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { PendingUserIncidentSteps, pendingUserIncidentFeature } from './state/pending-incidents';
import { CommonModule } from '@angular/common';
import { PendingUserIncidentCommands } from './state/pending-incidents/actions';
import { Observable } from 'rxjs';

@Component({

  standalone: true,
  template: ` <section>
      <router-outlet host="user"></router-outlet>
    </section>
  <pre>exists {{issueExists | async |  json}}</pre>
    <div class="steps">
      <a
        (click)="goToStep('description')"
        class="step "
        [ngClass]="{
          'step-primary':
            currentStep() === 'description',
          'step-success':
            completedSteps().includes('description') &&
            currentStep() !== 'description'
        }"
      >
        Description
      </a>
      <a
        (click)="goToStep('contact')"
        class="step "
        [ngClass]="{
          'step-primary':
            currentStep() === 'contact' ,
          'step-success':
            completedSteps().includes('contact') && currentStep() !== 'contact'
        }"
      >
        Contact
      </a>
      <a
        (click)="goToStep('review')"
        class="step "
        [ngClass]="{
          'step-primary':
            currentStep() === 'review',
          'step-success':
            completedSteps().includes('review') && currentStep() !== 'review'
        }"
      >
        Review
      </a>
    </div>`,
  imports: [RouterOutlet, CommonModule],
})
export class UserIncidentComponent implements OnInit  {
  @Input() id!: string;


  private readonly store = inject(Store);
  currentStep = this.store.selectSignal(pendingUserIncidentFeature.selectStep);
  issueExists: Observable<boolean> | undefined;
  completedSteps = this.store.selectSignal(
    pendingUserIncidentFeature.selectCompletedSteps
  );

  goToStep(step: PendingUserIncidentSteps) {
    this.store.dispatch(
      PendingUserIncidentCommands.goToStep({ payload: { step, id: this.id } })
    );
  }
  ngOnInit() {
    this.issueExists = this.store.select(pendingUserIncidentFeature.selectIfIssueExists(this.id));
    this.store.dispatch(
      PendingUserIncidentCommands.checkForIncident({ payload:  this.id })
    );
  }
}
