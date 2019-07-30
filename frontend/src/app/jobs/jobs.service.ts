import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  getAvailableJobs(): Observable<Job[]> {
    return of(null);
  }

  getJobById(jobId: number): Observable<Job> {
    return of(null);
  }

  makeBid(jobId: number, bid: {contractorId: number, amount: number}): Observable<boolean> {
    return of(false);
  }
}
