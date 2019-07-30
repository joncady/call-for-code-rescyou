import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../job';
import { PhotoSet } from 'src/app/damage-evaluation/damage-evaluation.service';

@Component({
  selector: 'app-job-summary',
  templateUrl: './job-summary.component.html',
  styleUrls: ['./job-summary.component.scss']
})
export class JobSummaryComponent implements OnInit {
  @Input()
  job: Job;
  imagePairs: Array<{title: string, comments: string, before: string, after: string}>;
  selectedImgIndex = 0;
  selectedImgLabel: 'before' | 'after';
  constructor() { }

  ngOnInit() {
    this.imagePairs = new Array(this.job.imagePairs.length);
    this.job.imagePairs.forEach((val: PhotoSet, index: number) => {
      const beforeImgReader = new FileReader();
      const afterImgReader = new FileReader();
      this.imagePairs[index] = {before: null, after: null, title: val.title, comments: val.comments}
      beforeImgReader.onload = () => {
        this.imagePairs[index].before = beforeImgReader.result as string;
      };
      afterImgReader.onload = () => {
        this.imagePairs[index].after = afterImgReader.result as string;
      };
      beforeImgReader.readAsDataURL(val.beforeImg);
      afterImgReader.readAsDataURL(val.afterImg);
    });
  }

  selectImage(index: number, label: 'before' | 'after') {
    this.selectedImgIndex = index;
    this.selectedImgLabel = label;
  }
}
