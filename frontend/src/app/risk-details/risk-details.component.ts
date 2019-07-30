import { Component, OnInit } from '@angular/core';
import { RiskScoreService } from '../risk-score/risk-score.service';

interface ScoreBreakdown {
  overallScore?: number;
  categories?: {[key: string]: number};
}

@Component({
  selector: 'app-risk-details',
  templateUrl: './risk-details.component.html',
  styleUrls: ['./risk-details.component.scss']
})
export class RiskDetailsComponent implements OnInit {
  breakdown: ScoreBreakdown = {};
  constructor(private scoreService: RiskScoreService) { }

  ngOnInit() {
  }

  onLatLngSelected(event: [number, number]) {
    const lat = event[0];
    const lng = event[1];
    this.scoreService.getRiskBreakdownForLatLng(lat, lng).subscribe(breakdown => {
      this.breakdown.categories = breakdown;
      let scoreSum = 0;
      let scoreCount = 0;
      for (const key in breakdown) {
        if (breakdown.hasOwnProperty(key)) {
          scoreCount += 1;
          scoreSum += breakdown[key];
        }
      }
      if (scoreCount > 0) {
        this.breakdown.overallScore = scoreSum / scoreCount;
      } else {
        this.breakdown.overallScore = undefined;
      }
    });
  }
}
