import { Component, OnInit } from '@angular/core';
import { Product, Tag } from '../../shared/AllModels';
import { CommonService } from '../../shared/services/common.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string;
  product: any;
  tags: Tag[] = [];

  constructor(private _commonService: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    //get id from url
    this.route.params.subscribe(param=>{
        this.productId = param['id'];
    })

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
}
