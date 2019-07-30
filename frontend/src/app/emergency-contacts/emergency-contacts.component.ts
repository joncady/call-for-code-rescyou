import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmergencyContactsService } from './emergency-contacts.service';
import { Observable } from 'rxjs';
import { EmergencyContact } from './emergency-contact';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.component.html',
  styleUrls: ['./emergency-contacts.component.scss']
})
export class EmergencyContactsComponent implements OnInit {
  contactsForm: FormGroup;
  emergencyContacts$: Observable<EmergencyContact[]>
  columnsToDisplay = ['name', 'phoneNumber'];
  constructor(private fb: FormBuilder, private contactsService: EmergencyContactsService) { }

  ngOnInit() {
    this.emergencyContacts$ = this.contactsService.getEmergencyContacts();
  }
}
