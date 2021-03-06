import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { decode } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RoleGuardService implements CanActivate {

    jwtHelper = new JwtHelperService();

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean
  {
      const expectedRole = route.data.expectedRole;

      const token = localStorage.getItem('token');

      const tokenPayload = this.jwtHelper.decodeToken(token);

      if(!this.auth.isAuthenticated() || tokenPayload.nonce != expectedRole)
      {
          this.router.navigate(['login']);
          return false;
      }

      return true;
  }
}
