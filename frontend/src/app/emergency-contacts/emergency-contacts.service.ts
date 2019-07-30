import { Injectable } from '@angular/core';
import { of, Observable, EMPTY } from 'rxjs';
import { EmergencyContact } from './emergency-contact';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactsService {
  constructor(private http: HttpClient) { }

  getEmergencyContacts(): Observable<EmergencyContact[]> {
    return this.http.get<EmergencyContact[]>(environment.getEmergencyContactsUrl, { withCredentials: true });
  }

  setEmergencyContacts(contacts: EmergencyContact[]): Observable<any> {
    return this.http.post(environment.setEmergencyContactsUrl, {
      contacts: contacts.map(contact => ({ name: contact.name, number: contact.phoneNumber }))
    }, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    });
  }
}
