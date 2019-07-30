import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = parsePhoneNumberFromString(control.value);
    if (phoneNumber) {
        return phoneNumber.isPossible() ? null : {invalidPhoneNumber: true};
    } else {
        return {invalidPhoneNumber: true};
    }
};
