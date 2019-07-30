import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DamageEvaluationService, PhotoSet } from '../damage-evaluation.service';
import { UploadBoxComponent } from '../upload-box/upload-box.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-before-photo-upload',
  templateUrl: './before-photo-upload.component.html',
  styleUrls: ['./before-photo-upload.component.scss']
})
export class BeforePhotoUploadComponent implements OnInit {
  uploadForms: FormArray;
  form: FormGroup;
  @ViewChildren('upload')
  uploadBoxes: QueryList<UploadBoxComponent>;

  constructor(private fb: FormBuilder, private damageEvalService: DamageEvaluationService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.uploadForms = this.fb.array([
      this.fb.group({
        title: ['Front Door', Validators.required],
        image: ['', Validators.required],
        comments: ['']
      }),
      this.fb.group({
        title: ['Garage', Validators.required],
        image: ['', Validators.required],
        comments: ['']
      }),
      this.fb.group({
        title: ['Attic', Validators.required],
        image: ['', Validators.required],
        comments: ['']
      }),
      this.fb.group({
        title: ['Back Entrance', Validators.required],
        image: ['', Validators.required],
        comments: ['']
      })
    ]);
    this.form = this.fb.group({
      sections: this.uploadForms
    });
  }

  addNewSection() {
    this.uploadForms.push(this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      comments: ['']
    }));
  }

  onSubmit() {
    if (this.form.valid) {
      this.changeDetector.detectChanges();
      const photoSets: PhotoSet[] = this.uploadForms.controls.map((control: FormGroup, index: number) => ({
        beforeImg: this.uploadBoxes.toArray[index].file,
        title: control.get('title').value,
        comments: control.get('comments').value
      }));
      this.damageEvalService.uploadBeforePhotos(photoSets).pipe(take(1)).subscribe();
    }
  }
}
