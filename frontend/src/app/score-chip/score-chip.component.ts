import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score-chip',
  templateUrl: './score-chip.component.html',
  styleUrls: ['./score-chip.component.scss']
})
export class ScoreChipComponent implements OnInit {
  @Input() score: number;
  constructor() { }

  ngOnInit() {
  }

}
