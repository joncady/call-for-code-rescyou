import { Component, OnInit } from '@angular/core';
import { RiskScoreService } from '../risk-score/risk-score.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  score: number;
  constructor(private scoreService: RiskScoreService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.scoreService.getOverallScoreForLatLng(position.coords.latitude, position.coords.longitude).subscribe(score => {
          this.score = score;
        });
      });
    }
  }

}
