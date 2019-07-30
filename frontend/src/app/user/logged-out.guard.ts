import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.currentUser) {
      return this.router.parseUrl('/home');
    }
    if (this.userService.currentUser$) {
      return this.userService.currentUser$.pipe(
        map(user => {
          if (user) {
            return this.router.parseUrl('/home');
          } else {
            return true;
          }
        }),
        catchError(err => {
          return of(true);
        })
      );
    } else {
      return true;
    }
  }

}
