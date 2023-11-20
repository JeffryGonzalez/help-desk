import { FormControl, FormGroup } from "@angular/forms";

export type MappedFormData<Type> = {
  [Property in keyof Type]: FormControl<Type[Property]>;
};

export type FormEditingItem<T> = {
    field: string;
    editing: boolean;
    dirty: boolean;
    value?: T,
    previousValue?: T,
    displayValue?: string,
}

export type FormEditing<Type> = {
    [Property in keyof Type]: FormEditingItem<Type[Property]>;
}


