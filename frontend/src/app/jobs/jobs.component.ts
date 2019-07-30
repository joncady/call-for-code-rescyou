import { Component, OnInit } from '@angular/core';
import { JobsService } from './jobs.service';
import { Observable } from 'rxjs';
import { Job } from './job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs$: Observable<Job[]>;
  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    this.jobs$ = this.jobsService.getAvailableJobs();
  }

}
