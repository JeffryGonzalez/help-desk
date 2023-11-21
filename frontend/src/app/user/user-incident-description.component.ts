import { Component, OnDestroy, OnInit, signal, inject, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subscription, debounceTime, filter, tap } from "rxjs";
import { pendingUserIncidentFeature } from "./state/pending-incidents";
import { PendingUserIncidentCommands } from "./state/pending-incidents/actions";
import { RouterLink } from "@angular/router";
import { JsonPipe } from "@angular/common";

@Component({
  standalone: true,
  template: ` <div >
    <form >
      
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
          placeholder="Please describe your issue in as much detail as possible."
        ></textarea>

        <a class="btn btn-info w-1/3" (click)="goNext()">
    Next
</a>
      </div>
    </form>
  </div>`,
  imports: [FormsModule, RouterLink, JsonPipe],
})
export class UserIncidentDescriptionComponent implements OnDestroy {
  description = signal<string>('');
  private readonly store = inject(Store);
  savedIncident = this.store.selectSignal(
    pendingUserIncidentFeature.selectCurrentIssue
  );
  private subDescription = new BehaviorSubject<string>('');


  private sub: Subscription;
  constructor() {
    this.sub = this.subDescription
      .pipe(
        debounceTime(1000),
        filter((d) => d.trim() !== ''),
        tap((d) =>
          this.store.dispatch(
            PendingUserIncidentCommands.updateIncident({
              payload: {
                id: this.savedIncident()?.id || '',
                changes: { description: d },
              },
            })
          )
        )
      )
      .subscribe();
  }
  goNext() {
    this.store.dispatch(PendingUserIncidentCommands.goToStep({ payload: { step: 'contact', id: this.savedIncident()?.id || ''} }));
  }
  updateDescription(change: string, event: KeyboardEvent) {
    if (event.key === 'Enter' && event.ctrlKey) {
      console.log('they way to continue.');
    }
    console.log(event);
    this.description.set(change);
    this.subDescription.next(change);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
