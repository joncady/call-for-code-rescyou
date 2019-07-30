import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appRedGreenScale]'
})
export class RedGreenScaleDirective implements OnInit, OnChanges {
  @Input('appRedGreenScale') scaleValue: number;
  constructor(private element: ElementRef) { }
  @Input() reverseScale: boolean;

  ngOnInit() {
    this.element.nativeElement.style.color = 'black';
    this.element.nativeElement.style.backgroundColor = this.getScaleColor();
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor = this.getScaleColor();
  }

  getScaleColor(): string {
    if (this.scaleValue === undefined) {
      return 'lightgray';
    }
    // Weight of colors corresponding to 0 and 1, respectively
    let color0Strength: number;
    let color1Strength: number;
    // Hex representations of the red and green components of the output
    let red: string;
    let green: string;

    if (this.scaleValue >= 1) {
      color0Strength = 0;
      color1Strength = 1;
    } else if (this.scaleValue <= 0) {
      color0Strength = 1;
      color1Strength = 0;
    } else if (this.scaleValue < 0.5) {
      color0Strength = 1;
      color1Strength = 2 * this.scaleValue;
    } else {
      color0Strength = 2 * (1 - this.scaleValue);
      color1Strength = 1;
    }
    if (this.reverseScale) {
      red = Math.round(color1Strength * 255).toString(16);
      green = Math.round(color0Strength * 255).toString(16);
    } else {
      red = Math.round(color0Strength * 255).toString(16);
      green = Math.round(color1Strength * 255).toString(16);
    }
    return '#' + red + green + '00';
  }
}
