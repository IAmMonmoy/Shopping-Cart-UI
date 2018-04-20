import { Component, OnInit } from '@angular/core';
import { Product,Tag } from '../admin-models';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../services/admin-service.service';
import { error } from 'protractor';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm : FormGroup;
  product : Product;
  isRequesting : boolean;
  tags : Tag[];

  constructor(private fb: FormBuilder, private _adminservice: AdminServiceService) { }

  ngOnInit() {
      this.getTags();
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
        Image : [''],
        Tags : ['', [Validators.required]]
    });
  }

  getTags()
  {
    this._adminservice.getAllTags().subscribe( data => {
        this.tags = data;
    }), error => {
      console.log(error);
    };
  }

  onSubmit()
  {
    console.log(this.productForm);
  }

}
