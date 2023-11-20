import { JsonPipe } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { FormEditing, FormEditingItem, MappedFormData } from "../utils";
import { userFeature } from "./state";
import { UserContactCommands, UserContactEdit } from "./state/actions";
import { FormItemComponen } from "./form-item.component";

type FormData = MappedFormData<UserContactEdit>;
type FormEdit = FormEditing<UserContactEdit>;
@Component({
  selector: 'app-user-contact',
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="add()" class="container">
    @for(key of keys; track key ) {
      <div class="form-control">
        <label class="label" [for]="key"
          ><span class="label-text">{{ formEditing[key].displayValue}}</span></label
        >

       
        <app-form-item
          [item]="formEditing[key]"
          [editingKey]="editingKey"
          (itemOperation)="onItemOperation($event)"
        ></app-form-item>
      </div>
    }
    </form>
    <div>
      <pre>{{ formEditing | json }}</pre>
    </div>
    <div>
      <pre>{{ firstName.value }}</pre>
    </div>
    <div>
        <pre>{{ editingKey}}</pre>
</div>
  `,
  imports: [ReactiveFormsModule, JsonPipe, FormItemComponen],
})
export class UserContactComponent implements OnInit {
  private readonly store = inject(Store);
  userContact = this.store.selectSignal(userFeature.selectContactChannel);
  formEditing: FormEdit;
  keys: [keyof FormData];
  editingKey: keyof FormData | undefined;
  form: FormGroup<FormData> = new FormGroup<FormData>({
    firstName: new FormControl<string>('', { nonNullable: true }),
    lastName: new FormControl<string>('', { nonNullable: true }),
    emailAddress: new FormControl<string>('', { nonNullable: true }),
    phoneNumber: new FormControl<string>('', { nonNullable: true }),
  });

  constructor() {
    this.formEditing = {
      firstName: {
        field: 'firstName',
        editing: false,
        dirty: false,
        displayValue: 'First Name',
      },
      lastName: { field: 'lastName', editing: false, dirty: false, displayValue: 'Last Name' },
      emailAddress: { field: 'emailAddress', editing: false, dirty: false, displayValue: 'Email Address' },
      phoneNumber: { field: 'phoneNumber', editing: false, dirty: false, displayValue: 'Phone Number' },
    };
    this.keys = Object.keys(this.formEditing) as [keyof FormData];
  }
  ngOnInit(): void {
    this.form.controls.firstName.setValue(this.userContact()?.firstName ?? '');
    this.form.controls.lastName.setValue(this.userContact()?.lastName ?? '');
    this.form.controls.emailAddress.setValue(
      this.userContact()?.emailAddress ?? ''
    );
    this.form.controls.phoneNumber.setValue(
      this.userContact()?.phoneNumber ?? ''
    );
  }
  get firstName() {
    return this.form.controls.firstName;
  }

  onItemOperation<T>(operation: {
    item: FormEditingItem<T>;
    operation:  'saved' | 'cancelled' | 'reverted' | 'editing';
    newValue?: unknown;
  }) {
    const i = operation.item.field as keyof FormData;
    switch (operation.operation) {
      case 'editing':
        this.editField(operation.item);
        break;
      case 'saved':
        this.saveField(operation.item, operation.newValue);
        break;
      case 'cancelled':
        this.cancelField(operation.item);
        break;
      case 'reverted':
        this.revertField(i);
        break;
    }
  }
  add() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  editField<T>(item: FormEditingItem<T>) {
 
    item.editing = true;
    const field = item.field as keyof FormData;
    item.value = (this.form.controls[field] as unknown as AbstractControl).value;
    this.editingKey = item.field as keyof FormData;
  }
  cancelField<T>(item: FormEditingItem<T>) {
    // this.form.controls[field].setValue(this.formEditing[field].value);
    // this.formEditing[field].editing = false;
    item.editing = false;
    item.dirty = false;
    this.editingKey = undefined;
    
  }

  saveField<T>(item: FormEditingItem<T>, newValue: unknown) {
    item.editing = false;
    item.dirty = true;
    item.previousValue = item.value;
    item.value = newValue as T;
  
    const field = item.field as keyof FormData;
  
    this.form.patchValue({
        [field]: newValue
    })

    this.form.updateValueAndValidity();
    this.store.dispatch(
      UserContactCommands.updateItem({
        payload: {
          operation: field,
          value: {
            [field]: this.form.controls[field].value,
          },
        },
      })
    );
    this.editingKey = undefined;
  }
  revertField(field: keyof FormData) {
    this.form.controls[field].setValue(this.formEditing[field].previousValue ?? '');
    this.formEditing[field].dirty = false;
    this.formEditing[field].previousValue = undefined;

    this.store.dispatch(
      UserContactCommands.updateItem({
        payload: {
          operation: field,
          value: {
            [field]: this.form.controls[field].value,
          },
        },
      })
    );
  }
}