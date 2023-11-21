import { Component, Input, OnDestroy, OnInit, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { PendingUserIncidentCommands } from "./state/pending-incidents/actions";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { pendingUserIncidentFeature } from "./state/pending-incidents";
import { BehaviorSubject, Subscription, debounceTime, filter, tap } from "rxjs";

@Component({
  selector: 'app-user-incident',
  standalone: true,
  template: ` <section>
    <router-outlet></router-outlet>
  </section>

    <ul class="steps">
      <li class="step step-primary">Get Started</li>
      <li class="step ">Description</li>
      <li class="step ">How To Contact You</li>
      <li class="step">Submit Issue</li>
    </ul>`,
    imports: [RouterOutlet]
})
export class UserIncidentComponent {}


@Component({
  standalone: true,
  template: ` <form>
    <p>Id: {{ id }} saved id: {{ savedIncident()?.id}} </p>
    <div class="form-control">
      <label for="description" class="label">Description:</label>
      <textarea
        id="description"
        #descField
        name="description"
        [value]="description()"
        (keyup)="updateDescription(descField.value, $event)"
        class="textarea textarea-bordered"
        rows="5"
        placeholder="Please describe your issue in as much detail as availble."
      ></textarea>
      <pre>{{ description() }}</pre>
      <button class="btn btn-info w-1/3">
        <p>Next</p>
      </button>
    </div>
  </form>`,
  imports: [FormsModule]
})
export class UserIncidentDescriptionComponent implements OnDestroy, OnInit {
    
   description = signal<string>('');
   private readonly store = inject(Store);
    savedIncident = this.store.selectSignal(pendingUserIncidentFeature.selectCurrent);
    private subDescription = new BehaviorSubject<string>('');
  @Input({ required: true }) id!: string;

  private sub: Subscription;
  constructor() {
    this.sub = this.subDescription
    .pipe(
        debounceTime(1000),
        filter(d => d.trim() !== ''),
        tap((d) => this.store.dispatch(PendingUserIncidentCommands.updateIncident({
            payload: {
                id: this.id,
                changes: { description: d }
            }
        })) )
    )
    .subscribe();
  }
  updateDescription(change:string, event: KeyboardEvent) {
    
    if(event.key === 'Enter' && event.ctrlKey) {
        console.log('they way to continue.')
    }
    console.log(event);
    this.description.set(change);
    this.subDescription.next(change);
  }
  ngOnInit(): void {
      if(this.id !== this.savedIncident()?.id) {
       this.store.dispatch(PendingUserIncidentCommands.setCurrentIncident({ payload: this.id }));
      }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  
  }
}

@Component({
  standalone: true,
  template: `
    <section class="prose">
        
      <h2>We are sorry you are having an issue.</h2>
      <p>
        Please follow the steps below and we will get back to you as soon as
        possible.
      </p>

      <div>
        <a (click)="begin()" class="btn btn-info w-1/3" routerLink="999/description">
          <p>Next</p>
   </a
        >
      </div>
    </section>
  `,
  imports: [RouterLink],
})
export class UserIncidentBeginComponent {
    private readonly store = inject(Store);

    begin() {
        this.store.dispatch(PendingUserIncidentCommands.createNewIncident());
    }
}