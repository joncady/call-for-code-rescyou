import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | UrlTree | boolean {
    if (this.userService.currentUser) {
      return true;
    }
    if (this.userService.currentUser$) {
      return this.userService.currentUser$.pipe(
        take(1),
        map(_ => true),
        catchError(err => of(this.router.parseUrl('/login')))
      );
    } else {
      return this.router.parseUrl('/login');
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | UrlTree | boolean {
    return this.canActivate(route, state);
  }
}
