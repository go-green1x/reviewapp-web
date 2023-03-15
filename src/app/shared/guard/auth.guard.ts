import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Routes_URL } from 'src/app/shared//constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      if (!this.auth.isAuthenticated()) {
        this.auth.logoutIfTokenExpired();
        this.router.navigateByUrl('/'+Routes_URL.AUTH +'/'+ Routes_URL.SIGN_IN);

        return false;
      }
      return true;
    }
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      if (!this.auth.isAuthenticated()) {
        this.auth.logoutIfTokenExpired();
        this.router.navigateByUrl('/'+Routes_URL.AUTH +'/'+ Routes_URL.SIGN_IN);
        return false;
      }
      return true;
  }

}

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate() {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/'+Routes_URL.BASE_URL);
      return false;
    }
    return true;
  }
}
