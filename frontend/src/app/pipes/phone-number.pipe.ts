import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string | number): string {
    let numberString: string;
    let parsedNumber: PhoneNumber;
    if (typeof value === 'number') {
      numberString = value.toString();
    } else {
      numberString = value;
    }
    parsedNumber = parsePhoneNumberFromString(numberString);
    if (parsedNumber) {
      return parsedNumber.formatInternational();
    }
    return numberString;
  }

}
