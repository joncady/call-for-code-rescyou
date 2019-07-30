import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { JobsService } from '../jobs.service';
import { switchMap } from 'rxjs/operators';
import { PhotoSet } from 'src/app/damage-evaluation/damage-evaluation.service';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from './bid-dialog/bid-dialog.component';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: Job;
  imagePairs: Array<{ title: string, comments: string, before: string, after: string }>;
  selectedImgIndex = 0;
  selectedImgLabel: 'before' | 'after';

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private jobsService: JobsService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.jobsService.getJobById(parseInt(params.get('id'), 10)))
    ).subscribe(job => {
      this.job = job;
      this.imagePairs = new Array(this.job.imagePairs.length);
      this.job.imagePairs.forEach((val: PhotoSet, index: number) => {
        const beforeImgReader = new FileReader();
        const afterImgReader = new FileReader();
        this.imagePairs[index] = { before: null, after: null, title: val.title, comments: val.comments }
        beforeImgReader.onload = () => {
          this.imagePairs[index].before = beforeImgReader.result as string;
        };
        afterImgReader.onload = () => {
          this.imagePairs[index].after = afterImgReader.result as string;
        };
        beforeImgReader.readAsDataURL(val.beforeImg);
        afterImgReader.readAsDataURL(val.afterImg);
      });
    });
  }

  openBidDialog(): void {
    this.dialog.open(BidDialogComponent, {
      width: '250px',
      data: { job: this.job, contractorId: 1 }
    });
  }

  selectImage(index: number, label: 'before' | 'after') {
    this.selectedImgIndex = index;
    this.selectedImgLabel = label;
  }
}
