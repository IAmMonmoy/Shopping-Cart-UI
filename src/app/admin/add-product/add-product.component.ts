import { Component, OnInit } from '@angular/core';
import { Product } from '../admin-models';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../services/admin-service.service';
import { error } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm : FormGroup;
  product : Product;
  isRequesting : boolean;

  constructor(private fb: FormBuilder, private _adminservice: AdminServiceService) { }

  ngOnInit() {
      this.createForm();
  }
  
  createForm()
  {
    this.productForm = this.fb.group({
        ProductCode : ['', [Validators.required]],
        ProductName : ['', [Validators.required]],
        Description : ['', [Validators.required]],
        Price : ['', [Validators.required, Validators.min(1), Validators.max(10000000)]],
        Stock : ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
        Image : ['', [Validators.required]],
        Tags : ['', [Validators.required]]
    });
  }

}
