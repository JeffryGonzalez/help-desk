import { FormControl, ValidatorFn } from '@angular/forms';

export type MappedFormData<Type> = {
  [Property in keyof Type]: FormControl<Type[Property]>;
};

export type FormEditingItem<T> = {
  field: string;
  editing: boolean;
  dirty: boolean;
  value?: T;
  previousValue?: T;
  displayValue?: string;
  validators?: ValidatorFn[];
};

export type FormEditing<Type> = {
  [Property in keyof Type]: FormEditingItem<Type[Property]>;
};

export function camelToTitleCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}