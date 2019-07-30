import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { matchingFieldsValidator } from '../validators/matching-fields-validator';
import { AddressService } from '../address/address.service';
import * as moment from 'moment';
import { UserService } from '../user/user.service';
import { DatePipe } from '@angular/common';
import { phoneNumberValidator } from '../validators/phone-number.validator';
import { parsePhoneNumber, formatIncompletePhoneNumber, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  BLOOD_TYPES = [
    'O-',
    'O+',
    'A-',
    'A+',
    'B-',
    'B+',
    'AB-',
    'AB+'
  ];
  phoneNumberPlaceholder = getExampleNumber('US', examples).formatInternational();
  signupForm: FormGroup;
  doneMessage: string;
  maxBirthdate = moment();
  constructor(private fb: FormBuilder, public addressService: AddressService, private userService: UserService) { }

  ngOnInit() {
    const phoneNumberControl = new FormControl('', {validators: [Validators.required, phoneNumberValidator], updateOn: 'change'});
    this.signupForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        birthdate: ['', [Validators.required]]
      }),
      contactInfo: this.fb.group({
        address: this.fb.group({
          addressLine1: ['', [Validators.required]],
          addressLine2: [''],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          postalCode: ['', [Validators.required, Validators.pattern(/\d{5}/)]]
        }),
        phoneNo: phoneNumberControl
      }),
      medicalInfo: this.fb.group({
        bloodType: [''],
        bloodDonor: [false],
        organDonor: [false],
        medications: [''],
        allergies: ['']
      }),
      loginInfo: this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: matchingFieldsValidator('password', 'confirmPassword') })
    });
  }

  onSubmit() {
    this.doneMessage = 'Processing your request...';
    const formData = Object.assign({}, this.signupForm.value);
    formData.personalInfo.birthdate = new DatePipe('en-US').transform(formData.personalInfo.birthdate, 'yyyy-MM-dd');
    formData.contactInfo.phoneNo = parsePhoneNumberFromString(formData.contactInfo.phoneNo, 'US').number;
    if (this.signupForm.valid) {
      this.userService.registerUser(formData).subscribe(_ => {
        this.doneMessage = 'Registration completed successfully! You may now log in.';
      }, err => {
        this.doneMessage = 'We are sorry. Something has gone wrong with your registration. Please try again.';
      });
    } else {
      this.doneMessage = 'Form data missing or invalid. Please check for errors and try again.';
    }
  }

  formatPhoneNumber() {
    const phoneNumberControl = this.signupForm.get('contactInfo.phoneNo');
    phoneNumberControl.setValue(formatIncompletePhoneNumber(phoneNumberControl.value, 'US'));
  }
}
