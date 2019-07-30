import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DamageEvaluationService } from '../damage-evaluation.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MultiUploadBoxComponent } from '../multi-upload-box/multi-upload-box.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-after-photo-upload',
  templateUrl: './after-photo-upload.component.html',
  styleUrls: ['./after-photo-upload.component.scss']
})
export class AfterPhotoUploadComponent implements OnInit {
  form: FormGroup;
  beforeImages: File[] = [];
  uploadForms: FormArray;
  @ViewChildren(MultiUploadBoxComponent)
  uploadBoxes: QueryList<MultiUploadBoxComponent>;

  constructor(private damageEval: DamageEvaluationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.uploadForms = this.fb.array([]);
    this.damageEval.getPhotos().subscribe(photos => {
      photos.forEach(photoSet => {
        this.beforeImages.push(photoSet.beforeImg);
        this.uploadForms.push(this.fb.group({
          title: [photoSet.title, Validators.required],
          afterImg: ['', Validators.required],
          comments: [photoSet.comments]
        }));
      });
    });
    this.form = this.fb.group({
      sections: this.uploadForms
    });
  }

  addNewSection() {
    this.uploadForms.push(this.fb.group({
      title: ['', Validators.required],
      afterImg: ['', Validators.required],
      comments: ['']
    }));
  }

  onSubmit() {
    this.damageEval.uploadAfterPhotos(this.uploadBoxes.map(component => component.afterImgFile)).pipe(take(1)).subscribe();
  }
}
