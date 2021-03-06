import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginAuthService } from './login/login-auth.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(private loginService: LoginAuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      if(!this.loginService.getIsValidUser()) {
        this.router.navigate(["/login"]);
        return this.loginService.getIsValidUser();
      }
      else {
        return this.loginService.getIsValidUser();
      }
  }
}
