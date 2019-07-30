import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUploadBoxComponent } from './multi-upload-box.component';

describe('MultiUploadBoxComponent', () => {
  let component: MultiUploadBoxComponent;
  let fixture: ComponentFixture<MultiUploadBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiUploadBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUploadBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
