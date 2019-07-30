import { RedGreenScaleDirective } from './red-green-scale.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appRedGreenScale [score]="score">Test text</div>`
})
class TestRedGreenScaleComponent {
  score: number;
}


describe('RedGreenScaleDirective', () => {
  let component: TestRedGreenScaleComponent;
  let fixture: ComponentFixture<TestRedGreenScaleComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedGreenScaleDirective, TestRedGreenScaleComponent]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(TestRedGreenScaleComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(RedGreenScaleDirective));
  });
});
