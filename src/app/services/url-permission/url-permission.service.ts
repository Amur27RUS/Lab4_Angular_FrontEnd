import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UrlPermission implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuthorized: boolean = localStorage.getItem('currentUser') != null;

    if (!isAuthorized && state.url.search('main') != -1) {
      this.router.navigate(['auth/login']);
      return false;

    } else if (isAuthorized && state.url.search('auth') != -1) {
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}
