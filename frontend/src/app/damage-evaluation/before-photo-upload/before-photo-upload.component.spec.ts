import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforePhotoUploadComponent } from './before-photo-upload.component';

describe('BeforePhotoUploadComponent', () => {
  let component: BeforePhotoUploadComponent;
  let fixture: ComponentFixture<BeforePhotoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforePhotoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforePhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
