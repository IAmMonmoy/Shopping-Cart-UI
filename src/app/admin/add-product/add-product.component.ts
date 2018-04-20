import { Component, OnInit } from '@angular/core';
import { Product,Tag } from '../admin-models';
import { FormBuilder, Validator, FormGroup, Validators, COMPOSITION_BUFFER_MODE } from '@angular/forms';
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
  selectedFile : File[];

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
      const fd = new FormData();
      fd.append('ProductName',this.productForm.controls.ProductName.value);
      fd.append('ProductCode',this.productForm.controls.ProductCode.value);
      fd.append('Description',this.productForm.controls.Description.value);
      fd.append('Price',this.productForm.controls.Price.value);
      fd.append('Stock',this.productForm.controls.Stock.value);

      for(let tag of this.productForm.controls.Tags.value)
      {
        fd.append('Tags', tag);
      }
      
      for(var img of this.selectedFile)
      {
        fd.append('Image',img, img.name);
      }
      
      
      this._adminservice.postProduct(fd).subscribe ( data => {
          console.log("yes");
      }),error => {
        console.log(error);
      }

      this.productForm.reset();
  }

  onFileSelected(event)
  {
      this.selectedFile = <File[]>event.target.files;
  }

}
