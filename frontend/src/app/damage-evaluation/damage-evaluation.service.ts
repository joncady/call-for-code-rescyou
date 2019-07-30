import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export class PhotoSet {
  beforeImg: File;
  comments: string;
  title: string;
  afterImg?: File;
}


@Injectable({
  providedIn: 'root'
})
export class DamageEvaluationService {

  constructor(private http: HttpClient) { }

  uploadBeforePhotos(photos: PhotoSet[]) {
    return this.http.post(environment.beforeImgUploadUrl, {imagePairs: photos}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  uploadAfterPhotos(photos: File[]) {
    return this.http.post(environment.afterImgUploadUrl, {imagePairs: photos.map(photo => ({img: photo}))}, {
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true
    });
  }

  getPhotos(): Observable<PhotoSet[]> {
    return this.http.get<PhotoSet[]>(environment.getImagesUrl, {withCredentials: true});
  }
}
