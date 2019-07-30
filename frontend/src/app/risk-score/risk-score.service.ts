import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { zip, Observable, of } from 'rxjs';

interface ScoreResponse {
  predictions: [
    {
      fields: string[],
      values: number[][][] | number[][]
    }
  ];
}

export interface RiskBreakdown {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class RiskScoreService {
  cachedLocations: Map<[number, number], RiskBreakdown> = new Map();
  constructor(private http: HttpClient) { }


  getOverallScoreForLatLng(lat: number, lng: number): Observable<number> {
    return this.getRiskBreakdownForLatLng(lat, lng).pipe(
      map(breakdown => {
        let sum = 0;
        let count = 0;
        for (const key in breakdown) {
          if (breakdown.hasOwnProperty(key)) {
            sum += breakdown[key];
            count += 1;
          }
        }
        if (count > 0) {
          return sum / count;
        } else {
          return undefined;
        }
      })
    );
  }

  getRiskBreakdownForLatLng(lat: number, lng: number): Observable<RiskBreakdown> {
    if (this.cachedLocations.has([lat, lng])) {
      return of(this.cachedLocations.get([lat, lng]));
    }
    const earthquakeScore$ = this.getEarthquakeScore(lat, lng);
    const hurricaneScore$ = this.getHurricaneScore(lat, lng);
    const fireScore$ = this.getFireScore(lat, lng);
    return zip(earthquakeScore$, hurricaneScore$, fireScore$).pipe(
      map(([earthquakeScore, hurricaneScore, fireScore]) => {
        const breakdown = {
          earthquake: earthquakeScore,
          hurricane: hurricaneScore,
          fire: fireScore
        };
        this.cachedLocations.set([lat, lng], breakdown);
        return breakdown;
      })
    );
  }

  private getEarthquakeScore(lat: number, lng: number): Observable<number> {
    return this.getScore(lat, lng, 'earthquakes').pipe(map(value => {
      try {
        return value[0];
      } catch (error) {
        return value;
      }
    }));
  }

  private getFireScore(lat: number, lng: number): Observable<number> {
    return this.getScore(lat, lng, 'fire').pipe(map(val => val as number / 10));
  }

  private getHurricaneScore(lat: number, lng: number): Observable<number> {
    const pacificScore$ = this.getScore(lat, lng, 'hurricane_pacific');
    const atlanticScore$ = this.getScore(lat, lng, 'hurricane_atlantic');
    return zip(pacificScore$, atlanticScore$).pipe(
      map(([pacScore, atlScore]) => {
        if (pacScore === undefined) {
          return atlScore as number;
        } else if (atlScore === undefined) {
          return pacScore as number;
        }
        return Math.min(Math.max(pacScore as number / 10, atlScore as number / 10, 0), 10);
      })
    );
  }

  private getScore(lat: number, lng: number, type: string): Observable<number | number[]> {
    return this.http.post<ScoreResponse>(environment.riskScoreUrl, { latitude: lat, longitude: lng, type })
      .pipe(
        map((data: ScoreResponse) => {
          try {
            return data.predictions[0].values[0][0];
          } catch (error) {
            return undefined;
          }
        })
      );
  }
}
