import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyContactsEditComponent } from './emergency-contacts-edit.component';

describe('EmergencyContactsEditComponent', () => {
  let component: EmergencyContactsEditComponent;
  let fixture: ComponentFixture<EmergencyContactsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyContactsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyContactsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
