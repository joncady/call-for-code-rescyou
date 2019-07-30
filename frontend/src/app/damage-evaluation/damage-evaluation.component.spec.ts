import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageEvaluationComponent } from './damage-evaluation.component';

describe('DamageEvaluationComponent', () => {
  let component: DamageEvaluationComponent;
  let fixture: ComponentFixture<DamageEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
