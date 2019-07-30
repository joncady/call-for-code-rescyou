import { TestBed } from '@angular/core/testing';

import { EmergencyContactsService } from './emergency-contacts.service';

describe('EmergencyContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmergencyContactsService = TestBed.get(EmergencyContactsService);
    expect(service).toBeTruthy();
  });
});
