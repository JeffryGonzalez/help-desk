import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  inject
} from '@angular/core';
import {
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormEditing, FormEditingItem, MappedFormData, camelToTitleCase } from '../utils';
import { EditingOperation, FormItemComponent } from './form-item.component';
import { UserContact, userFeature } from './state';
import { UserContactCommands, UserContactEdit } from './state/actions';

// type FormData = MappedFormData<UserContactEdit>;
type FormEdit = FormEditing<UserContactEdit>;
@Component({
  selector: 'app-user-contact',
  standalone: true,
  template: `
    <form class="container">
    
      @for(key of items(); track key.field ) {
    
      <app-form-item
        [item]="key"
        [editingKey]="editingKey"
        (itemOperation)="onItemOperation($event)"
      ></app-form-item>
      }
    </form>

  `,
  imports: [JsonPipe, FormItemComponent, NgIf],
})
export class UserContactComponent {
  private readonly store = inject(Store);
  userContact = this.store.selectSignal(userFeature.selectContactChannel);
  keys = computed<[keyof FormData]>(() =>
    Object.keys(this.formEditing()) as [keyof FormData]
  );
  items = computed(() => Object.values(this.formEditing()));
  formEditing = computed<FormEdit>(() => {
    const defaults = {editing: false, dirty: false}
    return {
      firstName: {
        ...defaults,
  
        field: 'firstName',
        displayValue: camelToTitleCase('firstName'),
        value: this.userContact()?.firstName ?? '',
      },
      lastName: {
        ...defaults,
        field: 'lastName',
        displayValue: camelToTitleCase('lastName'),
        value: this.userContact()?.lastName ?? '',
      },
      emailAddress: {
        ...defaults,
        field: 'emailAddress',
      
        displayValue: camelToTitleCase('emailAddress'),
        value: this.userContact()?.emailAddress ?? '',
      },
      phoneNumber: {
        ...defaults,
        field: 'phoneNumber',
        displayValue: camelToTitleCase('phoneNumber'),
        value: this.userContact()?.phoneNumber ?? '',
      },
    };
  });

  editingKey: (keyof FormEdit) | undefined;


  constructor() {}

  onItemOperation<T>(operation: EditingOperation<T>) {
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
    }
  }

  editField<T>(item: FormEditingItem<T>) {
    item.editing = true;
    const field = item.field as keyof FormEdit;
 
    this.editingKey = field;
  }
  cancelField<T>(item: FormEditingItem<T>) {
    item.editing = false;
    item.dirty = false;
    this.editingKey = undefined;
  }

  saveField<T>(item: FormEditingItem<T>, newValue: unknown) {
    item.editing = false;
    item.dirty = true;
    item.previousValue = item.value;
    item.value = newValue as T;

    const field = item.field as keyof FormEdit;

    this.store.dispatch(
      UserContactCommands.updateItem({
        payload: {
          operation: field,
          value: {
            [field]: item.value,
          },
        },
      })
    );
    this.editingKey = undefined;
  }
}

// function to convert from camelCase to Title Case


function hogwash(field:keyof UserContactEdit, value:unknown):Partial<FormEditingItem<UserContactEdit>> {
    let r  ={
    field: field,
    displayValue: camelToTitleCase('firstName'),
    value: value as any
  };
  return r;
}