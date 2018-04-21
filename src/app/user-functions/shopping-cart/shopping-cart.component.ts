import { Component, OnInit } from '@angular/core';
import { cartProduct } from '../../shared/AllModels';
import { CommonService } from '../../shared/services/common.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  allCartProduct : cartProduct[];
  totalPrice : number;
  checkOutForm : FormGroup;

  constructor(private _commonService: CommonService, private fb: FormBuilder, private route:Router) { }

  ngOnInit() {
    this.getCartProducts();
    this.createForm();
    
    //console.log(this.allCartProduct);
  }

  getCartProducts()
  {
    this.allCartProduct = this._commonService.getCartProductFromLocalStorage();
    this.totalPrice=0;
    this.allCartProduct.forEach(element => {
      this.totalPrice += element.TotalPrice;
    });
  }

  onSubmit()
  {
      if(this.allCartProduct.length > 0)
        this.allCartProduct.forEach(element => {
            this._commonService.updateProductStock(element.Id,element.NumberOfProduct).subscribe(
              val => {
                console.log(val);
              }
            );
        });

        this.clearCart();
        this.route.navigate(['/allProduct']);
  }
  
  createForm()
  {
    this.checkOutForm = this.fb.group({
        Name : ['', [Validators.required]],
        Address : ['', [Validators.required]],
        Phone : ['', [Validators.required]]
    });
  }
  
  clearCart()
  {
    this._commonService.clearCart();
    this.getCartProducts();
    this._commonService.getLocalProductsNumber();
  }
}
