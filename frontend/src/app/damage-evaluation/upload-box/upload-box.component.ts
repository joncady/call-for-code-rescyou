import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss'],
})
export class UploadBoxComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() uniqueIndex: number;
  @Input() titleFormControlName = 'title';
  @Input() imageFormControlName = 'image';
  @Input() commentFormControlName = 'comments';
  @Output() deleteButtonClick = new EventEmitter<void>();
  @ViewChild('title', {static: false})
  titleField: ElementRef;
  editingTitle: boolean;
  imgPreviewUrl: string | ArrayBuffer;
  file: File;

  constructor(private changeDetectorRef: ChangeDetectorRef, private host: ElementRef<HTMLInputElement>) { }

  ngOnInit() {
    this.editingTitle = false;
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

  loadImgPreview(input: HTMLInputElement) {
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imgPreviewUrl = fileReader.result;
      };
      fileReader.readAsDataURL(this.file);
    } else {
      this.file = null;
    }
  }
}
