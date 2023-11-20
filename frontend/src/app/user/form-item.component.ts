import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormEditing, FormEditingItem, MappedFormData } from '../utils';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

const editIcon = ``;
@Component({
  selector: 'app-form-item',
  standalone: true,
  template: `
    <div class="f">
      <div class="form-control">
        <pre>
    KEY: {{ editingKey ?? 'None' }} FIELD: {{ item.field }} EQUALS: {{ item.field === editingKey }}
</pre
        >
        @if(item.editing === false) {
        <div class="flex-1">
          <button
            (click)="editField()"
            type="button"
            class=""
          [disabled]=" item.field !== editingKey"
          >
            <span>✏️</span>
          </button>
          <span class="ml-4 font-bold max-w-md">{{
            item.value || 'No ' + item.displayValue + ' Provided'
          }}</span>
        </div>

        } @else {
        <div class="flex-1">
          <input
            type="text"
            [id]="item.field"
            class="input input-bordered"
            #field
          />
          <button
            type="button"
            (click)="saveField(field.value)"
            class="btn btn-xs"
          >
            <span>✅</span>
          </button>

          <button type="button" (click)="cancelField()" class="btn btn-xs">
            <span>🚫</span>
          </button>
        </div>
        } @if(item.dirty) {
        <button type="button" (click)="revertField()" class="btn btn-xs">
          🙃
        </button>

        }
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, NgIf],
})
export class FormItemComponen<T, TForm> {
  @Input({ required: true }) item!: FormEditingItem<T>;
  @Input({ required: true }) editingKey: keyof TForm | undefined;

  @Output() itemOperation = new EventEmitter<{
    item: FormEditingItem<T>;
    newValue?: unknown;
    operation: 'editing' | 'saved' | 'cancelled' | 'reverted';
  }>();

  editIcon = editIcon;
  saveField(value: unknown) {
    this.itemOperation.emit({
      item: this.item,
      operation: 'saved',
      newValue: value,
    });
  }

  cancelField() {
    //
    this.itemOperation.emit({ item: this.item, operation: 'cancelled' });
  }

  revertField() {
    this.itemOperation.emit({ item: this.item, operation: 'reverted' });
  }
  editField() {
    this.itemOperation.emit({ item: this.item, operation: 'editing' });
  }
}

