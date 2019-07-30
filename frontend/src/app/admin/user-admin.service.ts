import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfo } from './userInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  constructor(private http: HttpClient) { }

  getUsersByBloodtype(bloodType: string): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(environment.bloodTypeSearchUrl, {
      params: {bloodtype: bloodType},
      withCredentials: true
    });
  }
}
