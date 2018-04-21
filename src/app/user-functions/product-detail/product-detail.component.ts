import { Component, OnInit } from '@angular/core';
import { Product, Tag } from '../../shared/AllModels';
import { CommonService } from '../../shared/services/common.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string;
  product: any;
  tags: Tag[] = [];
  baseUrl: string;
  purchaseAmount: number;
  totalPrice: number;

  constructor(private _commonService: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    //get id from url
    this.route.params.subscribe(param=>{
        this.productId = param['id'];
    })

    this.purchaseAmount = 0;
    this.totalPrice = 0;

    this.baseUrl = environment.baseUrl;

    this.getProductById();
  }


  getProductById()
  {
    this._commonService.getProductById(this.productId).subscribe( val => {
      this.product = val;
      this.getTagById();
    }),error => {
      console.log(error);
    };
  }

  getTagById()
  {
      this.product.tags.forEach(element => {
          this._commonService.getTagById(element.tagId).subscribe( val => {
              this.tags.push(val);
          });
      });
  }

  addAmount()
  {
    //can not take more than stock
    //save the id in the value of button to identify which product
    if(this.purchaseAmount+1 <= this.product.stock)
    {
      this.purchaseAmount++;
      this.totalPrice = this.purchaseAmount*this.product.price;
    }
        
  }

  subtractAmount(event)
  {
    //saved the index in the id of button to identify which button clicked
    if(this.purchaseAmount-1 >= 0)
    {
      this.purchaseAmount--;
      this.totalPrice = this.purchaseAmount*this.product.price;
    }
  }

  cartButtonClick(event)
  {
    this._commonService.addCatProductToLocalStorage(event,this.purchaseAmount,this.product);
    this.purchaseAmount = 0;
  }
}
