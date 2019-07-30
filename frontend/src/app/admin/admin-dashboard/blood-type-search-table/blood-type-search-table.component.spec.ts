import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTypeSearchTableComponent } from './blood-type-search-table.component';

describe('BloodTypeSearchTableComponent', () => {
  let component: BloodTypeSearchTableComponent;
  let fixture: ComponentFixture<BloodTypeSearchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTypeSearchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTypeSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
