import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-upload-box',
  templateUrl: './multi-upload-box.component.html',
  styleUrls: ['./multi-upload-box.component.scss']
})
export class MultiUploadBoxComponent implements OnInit {
  @Input() beforeImage: File;
  @Input() uniqueIndex: number;
  @Input() commentFormControlName = 'comments';
  @Input() beforeImgFormControlName = 'beforeImg';
  @Input() afterImgFormControlName = 'afterImg';
  @Input() titleFormControlName = 'title';
  @Input() formGroup: FormGroup;
  @Output() deleteButtonClick = new EventEmitter<void>();
  @ViewChild('title', { static: false })
  afterImgFile: File;
  titleField: ElementRef;
  beforeImgPreviewUrl: string | ArrayBuffer;
  afterImgPreviewUrl: string | ArrayBuffer;
  editingTitle = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadBeforeImgPreview();
  }

  closeTitleEditor() {
    this.editingTitle = false;
  }

  openTitleEditor() {
    this.editingTitle = true;
    // Force change detection
    this.changeDetectorRef.detectChanges();
    this.titleField.nativeElement.focus();
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.closeTitleEditor();
    }
  }

  loadBeforeImgPreview() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.beforeImgPreviewUrl = fileReader.result;
    };
    fileReader.readAsDataURL(this.beforeImage);
  }

  loadAfterImgPreview(input: HTMLInputElement) {
    if (input.files && input.files[0]) {
      this.afterImgFile = input.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.afterImgPreviewUrl = fileReader.result;
      };
      fileReader.readAsDataURL(this.afterImgFile);
    }
  }
}
