import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskDetailsComponent } from './risk-details.component';

describe('RiskDetailsComponent', () => {
  let component: RiskDetailsComponent;
  let fixture: ComponentFixture<RiskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
