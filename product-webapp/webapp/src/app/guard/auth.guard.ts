import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { SecurityService } from '../service/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedInWithJwt()) {
      console.log('jwt token is there');
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

    isLoggedInWithJwt() {
    const token = window.localStorage.getItem('tgt');
    return token != null;
  }
}
