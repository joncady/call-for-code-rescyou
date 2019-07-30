import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBoxComponent } from './upload-box.component';

describe('UploadBoxComponent', () => {
  let component: UploadBoxComponent;
  let fixture: ComponentFixture<UploadBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
