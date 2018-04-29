import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { Product,Tag, cartProduct,Shipment, ShipmentQuantity } from '../AllModels';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class CommonService extends BaseService{
  jwtHelper = new JwtHelperService();
  allCartProduct : cartProduct[];
  addToCart: cartProduct;

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

    return this._http.get(`${environment.baseUrl}/api/tags/`+id,httpOptions).pipe(
      catchError(val=>this.handleError(new HttpErrorResponse(val)))
    );
  }

  updateProductStock(id,stock)
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

    return this._http.put(`${environment.baseUrl}/api/products/${id}/${stock}`,httpOptions).pipe(
      catchError(val=>this.handleError(new HttpErrorResponse(val)))
    );
  }

  addCatProductToLocalStorage(event, quantity, product)
  {
    if(quantity>0)
    {
      let getItems = JSON.parse(localStorage.getItem('products'));

      if(getItems == null)
        getItems = [];
      
      this.allCartProduct = getItems;

    
      //if there is duplicate update the number of product buying with previous number and update totalprice
      if(this.allCartProduct.find(pro=>pro.Id == event.target.value) != null)
      {
        this.allCartProduct.find(pro=>pro.Id == event.target.value).NumberOfProduct += quantity;
        this.allCartProduct.find(pro=>pro.Id == event.target.value).TotalPrice = this.allCartProduct.find(pro=>pro.Id == event.target.value).NumberOfProduct* this.allCartProduct.find(pro=>pro.Id == event.target.value).Price;
      }

      else {
        this.addToCart = new cartProduct();
        this.addToCart.Id = product.id;
        this.addToCart.ProductCode = product.productCode;
        this.addToCart.ProductName = product.productName;
        this.addToCart.Description = product.description;
        this.addToCart.Price = product.price;
        this.addToCart.NumberOfProduct = quantity
        this.addToCart.TotalPrice = quantity*product.price;
  
        this.allCartProduct.push(this.addToCart);
      }

      localStorage.setItem('products',JSON.stringify(this.allCartProduct)); 
    }
  }

  getCartProductFromLocalStorage() : cartProduct[]
  {
      return JSON.parse(localStorage.getItem('products'));
  }

  getLocalProductsNumber() : number
  {
    var totalProduct = 0;
     this.allCartProduct = JSON.parse(localStorage.getItem('products'));
     if(this.allCartProduct == null) this.allCartProduct = [];
     this.allCartProduct.forEach(element => {
       totalProduct += element.NumberOfProduct;
     });

     return totalProduct;
  }

  clearCart()
  {
    localStorage.removeItem('products');
  }

  postShipment(shipment)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

    return this._http.post(`${environment.baseUrl}/api/shipment`,shipment,httpOptions).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    )

  }

  getShipment():Observable<Shipment[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

    return this._http.get(`${environment.baseUrl}/api/shipment`,httpOptions).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    )

  }

  getShipmentProductById(id):Observable<ShipmentQuantity[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          Authorization : 'Bearer '+ this.getAuthorizationToken()
      })
    }

    return this._http.get(`${environment.baseUrl}/api/shipment/${id}`,httpOptions).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    )

  }


  getUserName() : string
  {
    const token = this.getAuthorizationToken();

      const tokenPayload = this.jwtHelper.decodeToken(token);
      
      return tokenPayload.sub;
  }

  getAuthorizationToken() : string
  {
    return localStorage.getItem('token');
  }

}
