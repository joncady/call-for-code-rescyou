import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { JobsService } from '../../jobs.service';
import { Job } from '../../job';

export interface DialogData {
  job: Job;
  contractorId: number;
}

@Component({
  selector: 'app-bid-dialog',
  templateUrl: './bid-dialog.component.html',
  styleUrls: ['./bid-dialog.component.scss']
})
export class BidDialogComponent implements OnInit {
  bidForm: FormGroup;
  errorMessage: string;
  constructor(
    public dialogRef: MatDialogRef<BidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.bidForm = new FormGroup({
      amount: new FormControl(Math.max(this.data.job.topBid.amount - 0.01, 0),
        [Validators.required, Validators.min(0), Validators.max(Math.max(this.data.job.topBid.amount - 0.01, 0))])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.bidForm.valid) {
      this.jobsService.makeBid(this.data.job.id, {
        contractorId: this.data.contractorId,
        amount: this.bidForm.get('amount').value
      }).subscribe(success => {
        if (success) {
          this.dialogRef.close();
        } else {
          this.errorMessage = 'Failed to make bid.';
        }
      }, error => {
        this.errorMessage = 'Failed to make bid.';
      });
    } else {
      this.errorMessage = 'Please enter a valid amount.';
    }
  }
}
