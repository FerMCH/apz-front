import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // Permite campos opcionales

    const value = control.value.toString().toLowerCase();
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    return regex.test(value) ? null : { invalidUuid: true };
  };
}
