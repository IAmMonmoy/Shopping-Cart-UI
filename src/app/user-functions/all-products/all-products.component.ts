import { Component, OnInit } from '@angular/core';
import { Product,cartProduct } from '../../shared/AllModels';
import { CommonService } from '../../shared/services/common.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products : any[];
  baseUrl : any;
  product : any;
  purchaseAmount : any[] = [];
  selectedButton : Number;
  addToCart : cartProduct;
  allCartProduct: cartProduct[];

  constructor(private _commonService: CommonService, private route: Router) { }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.getAllProduct();
  }

  getAllProduct()
  {
      this._commonService.getAllProduct().subscribe(val => {
        this.products = val;
        for(var i = 0; i<this.products.length; i++)
            this.purchaseAmount[i] = 0;
            
      }), error => {
        console.log(error);
      };
  }

  addAmount(event)
  {
    //can not take more than stock
    //save the id in the value of button to identify which product
    if(this.purchaseAmount[event.target.id]+1 <= this.products.find(pro => pro.id == event.target.value).stock)
        this.purchaseAmount[event.target.id]++;
    console.log(event.target.value);
  }

  subtractAmount(event)
  {
    //saved the index in the id of button to identify which button clicked
    if(this.purchaseAmount[event.target.id]-1 >= 0)
        this.purchaseAmount[event.target.id]--;
  }

  onCardClick(id)
  {
    this.route.navigate(['/product/'+id]);
  }

  cartButtonClick(event)
  {
    this._commonService.addCatProductToLocalStorage(event,this.purchaseAmount[event.target.id],this.products.find(pro=>pro.id == event.target.value));
    this.purchaseAmount[event.target.id] = 0;
  }

}
