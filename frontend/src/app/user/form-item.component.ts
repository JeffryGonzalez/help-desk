import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormEditingItem } from '../utils';

type EditingOperations = 'editing' | 'saved' | 'cancelled';

export type EditingOperation<T> = {
  item: FormEditingItem<T>;
  newValue?: unknown;
  operation: EditingOperations;
};

@Component({
  selector: 'app-form-item',
  standalone: true,
  template: `
    <div class="f">
      <div class="form-control">
        <label class="label" [for]="item.field"
          ><span class="label-text">{{ item.displayValue }}</span></label
        >
        @if(item.editing === false) {
        <div class="flex-1">
          <span tabindex="0" (keyup)="handleKeysForTabbing($event)">
            <input
              [id]="item.field"
              class="input input-bordered "
              value="{{
                item.value || 'No ' + item.displayValue + ' Provided'
              }}"
              disabled
            />
          </span>
          <button
            (click)="onItemOperation('editing')"
            type="button"
            class="ml-2 btn btn-xs"
            *ngIf="!isEditing()"
          >
            <span>✏️</span>
          </button>
        </div>

        } @else {
        <div class="flex-1">
          <input
            type="text"
            [id]="item.field"
            (keyup)="handleKeysForInput($event)"
            class="input input-bordered"
            #field
          />
          <button
            type="button"
            (click)="onItemOperation('saved')"
            title="save (Enter)"
            class="btn btn-xs"
          >
            <span>✅</span>
          </button>

          <button
            type="button"
            (click)="onItemOperation('cancelled')"
            title="cancel (Esc)"
            class="btn btn-xs"
          >
            <span>🚫</span>
          </button>
        </div>
        }
      </div>
    </div>
  `,

  imports: [ReactiveFormsModule, NgIf, JsonPipe],
})
export class FormItemComponent<T> implements OnChanges {
  @Input({ required: true }) item!: FormEditingItem<T>;
  @Input({ required: true }) editingKey: string | undefined;
  @ViewChild('field') field!: ElementRef<HTMLInputElement>;
  @Output()
  itemOperation = new EventEmitter<EditingOperation<T>>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingKey']) {
      if (this.item.field === this.editingKey) {
        setTimeout(() => this.field.nativeElement.focus(), 0);
      }
    }
  }
  hasErrors() {
    if (this.item.validators === undefined) return null;
    const ac = { value: this.item.value } as AbstractControl;
    return this.item.validators.map((v) => v(ac));
  }
  handleKeysForInput(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.onItemOperation('cancelled');
    }
    if (event.code === 'Enter') {
      const t = event.target as HTMLInputElement;

      this.onItemOperation('saved', t.value);
    }
  }
  handleKeysForTabbing(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.onItemOperation('editing');
    }
  }

  isEditing() {
    if (this.editingKey === undefined) return false;
    return this.item.field !== this.editingKey;
  }

  onItemOperation(operation: EditingOperations, newValue?: unknown) {
    this.itemOperation.emit({ item: this.item, operation, newValue });
  }
}
