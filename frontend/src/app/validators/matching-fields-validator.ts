import { ValidatorFn, FormGroup } from '@angular/forms';

export function matchingFieldsValidator(field1Name: string, field2Name: string): ValidatorFn {
    return (control: FormGroup): {passwordMismatch: boolean} | null => {
        return control.get(field1Name).value === control.get(field2Name).value ? null : {passwordMismatch: true};
    };
}
