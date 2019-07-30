import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterPhotoUploadComponent } from './after-photo-upload.component';

describe('AfterPhotoUploadComponent', () => {
  let component: AfterPhotoUploadComponent;
  let fixture: ComponentFixture<AfterPhotoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterPhotoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterPhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
