import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Credential,Auth, Tag, Product } from '../../shared/AllModels';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class AdminServiceService extends BaseService{

  constructor(private http: HttpClient) {  super() }

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

  getAllTags() : Observable<Tag[]>
  {
    return this.http.get(`${environment.baseUrl}/api/tags`).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    );
  }

  postTag(tag: Tag)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

      return this.http.post(`${environment.baseUrl}/api/tags`,tag,httpOptions).pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  deleteTag(id:string)
  {
    return this.http.delete(`${environment.baseUrl}/api/tags/${id}`).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    );
  }

  postProduct(formData: FormData)
  {
   
    return this.http.post(`${environment.baseUrl}/api/products`,formData);
  }
}
