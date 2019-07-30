import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreChipComponent } from './score-chip.component';

describe('ScoreChipComponent', () => {
  let component: ScoreChipComponent;
  let fixture: ComponentFixture<ScoreChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
