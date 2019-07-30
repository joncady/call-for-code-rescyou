import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmergencyContactsService } from '../emergency-contacts/emergency-contacts.service';
import { EmergencyContact } from '../emergency-contacts/emergency-contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-contacts-edit',
  templateUrl: './emergency-contacts-edit.component.html',
  styleUrls: ['./emergency-contacts-edit.component.scss']
})
export class EmergencyContactsEditComponent implements OnInit {
  errorMessage: string;
  contactsForm = this.fb.group({
    contacts: new FormArray([])
  });
  constructor(private fb: FormBuilder, private contactsService: EmergencyContactsService, private router: Router) { }

  ngOnInit() {
    this.contactsService.getEmergencyContacts().subscribe(contacts => {
      this.generateContactsForm(contacts);
    });
  }

  get contacts(): FormArray {
    return this.contactsForm.get('contacts') as FormArray;
  }

  addNewContact() {
    this.contacts.push(this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    }));
  }

  onSubmit() {
    this.contactsService.setEmergencyContacts(this.contacts.value).subscribe(success => {
      this.router.navigate(['/contacts']);
    }, error => {
      this.errorMessage = 'Something went wrong. Please try again.';
    });
  }

  private generateContactsForm(contacts: EmergencyContact[]) {
    contacts.forEach(contact => {
      this.contacts.push(this.fb.group({
        name: [contact.name, Validators.required],
        phoneNumber: [contact.phoneNumber, Validators.required]
      }));
    });
  }
}
