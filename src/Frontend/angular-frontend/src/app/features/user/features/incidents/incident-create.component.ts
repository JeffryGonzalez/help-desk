import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IncidentsService } from './services/incidents.service';
import { injectIsMutating } from '@ngneat/query';

@Component({
  selector: 'app-incident-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="modal-box w-11/12">
      <h3 class="font-bold text-lg">Create an Incident</h3>
      <p class="py-4">Press ESC key or click the button below to cancel</p>
      <form [formGroup]="form" (ngSubmit)="add()">
        <div class="form-control">
          <label class="label" for="description">Description</label>
          <textarea
            formControlName="description"
            class="textarea textarea-bordered"
            id="description"
            name="description"
          ></textarea>
        </div>
        <div class="modal-action">
          <button type="submit" class="btn btn-primary">Log Incident</button>
          <button (click)="cancel()" type="button" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class IncidentCreateComponent {
  createIncident = inject(IncidentsService).create();
  private readonly mutating = injectIsMutating();
  @Output() done = new EventEmitter<void>();
  form = new FormGroup({
    description: new FormControl<string>('', { nonNullable: true }),
  });

  add() {
    this.createIncident.mutate({description: this.form.controls.description.value!});
    console.log(this.form.value);
    this.done.emit();
  }
  cancel() {
    this.done.emit();
  }
}
