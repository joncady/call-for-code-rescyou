import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

class UserResponse {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  currentUser$: Observable<User>;

  constructor(private http: HttpClient) { }

  login(username: string, password: string, save = false) {
    return this.http.post<UserResponse>(environment.loginUrl, { username, password }, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }).pipe(
      map(resp => {
        if (resp) {
          this.currentUser = {
            id: resp.id,
            email: resp.email,
            firstName: resp.first_name,
            lastName: resp.last_name
          };
          return true;
        } else {
          return false;
        }
      }),
      catchError(err => of(false))
    );
  }

  logout(): Observable<any> {
    return this.http.get(environment.logoutUrl, {withCredentials: true}).pipe(
      map(val => {
        this.currentUser = null;
        this.currentUser$ = null;
        return val;
      })
    );
  }

  updateCurrentUser(): void {
    this.currentUser$ = this.http.get<User>(environment.getUserUrl, {withCredentials: true});
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getUser(userId: string): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    } else {
      return this.http.post<User>(environment.loginUrl, { user: userId }, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      });
    }
  }

  registerUser(formData: object) {
    return this.http.post(environment.signupUrl, formData, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  userIsLoggedIn() {
    return this.currentUser !== null && this.currentUser !== undefined;
  }
}
