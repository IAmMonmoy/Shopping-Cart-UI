import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Credential,Auth, Tag, Product } from '../../shared/AllModels';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AdminServiceService extends BaseService{
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, public auth: AuthService) {  super() }

  login(_credential:Credential): Observable<Auth>
  {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }

       return this.http.post(`${environment.baseUrl}/api/auth/`, _credential, httpOptions)
        .pipe(
          catchError(val => this.handleError(new HttpErrorResponse(val)))
        );
  }

  storeToken(auth:Auth)
  {
    localStorage.setItem('token', auth.token);
  }

  getAuthorizationToken() : string
  {
    return localStorage.getItem('token');
  }

  getAllTags() : Observable<Tag[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

    return this.http.get(`${environment.baseUrl}/api/tags`,httpOptions).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    );
  }

  postTag(tag: Tag)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

      return this.http.post(`${environment.baseUrl}/api/tags`,tag,httpOptions).pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  deleteTag(id:string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

    return this.http.delete(`${environment.baseUrl}/api/tags/${id}`,httpOptions).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    );
  }

  postProduct(formData: FormData)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }
    return this.http.post(`${environment.baseUrl}/api/products`,formData, httpOptions);
  }

  isAuthenticated()
  {
    if(!this.auth.isAuthenticated())
      return false;
    return true;
  }

  isAdmin()
  {
    const token = localStorage.getItem('token');

      const tokenPayload = this.jwtHelper.decodeToken(token);

      if(!this.auth.isAuthenticated() || tokenPayload.nonce != "Administrator")
          return false;

      return true;
  }
}
