import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { Product,Tag } from '../AllModels';

@Injectable()
export class CommonService extends BaseService{

  constructor(private _http: HttpClient) { super() }

  getAllProduct() : Observable<Product[]>
  {
      return this._http.get(`${environment.baseUrl}/api/products`).pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  getProductById(id) : Observable<Product>
  {
      return this._http.get(`${environment.baseUrl}/api/products/`+id).pipe(
        catchError(val=>this.handleError(new HttpErrorResponse(val)))
      );
  }

  getTagById(id) : Observable<Tag>
  {
    return this._http.get(`${environment.baseUrl}/api/tags/`+id).pipe(
      catchError(val=>this.handleError(new HttpErrorResponse(val)))
    );
  }
}
