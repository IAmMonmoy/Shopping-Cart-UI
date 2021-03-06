import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { Tag } from '../../shared/AllModels';
import { error } from 'protractor';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
 tags : object[];
  tagForm : FormGroup;
  isRequesting : boolean;
  tagModel : Tag;

  constructor(private fb: FormBuilder, private _adminService: AdminServiceService) { }

  ngOnInit() {

    this.getAllTags();
    this.createForm();

  }

  getAllTags()
  {
    this._adminService.getAllTags().subscribe(
      data => {
        this.tags = data;
      }
    );
  }

  createForm()
  {
      this.tagForm = this.fb.group({
        TagName : ['', [Validators.required]],
        TagDescription : ['', [Validators.required]],
      });
  }

  onSubmit()
  {
      if(this.tagForm.valid)
      {
          this.tagModel = new Tag();
          this.tagModel.TagName = this.tagForm.controls.TagName.value;
          this.tagModel.TagDescription = this.tagForm.controls.TagDescription.value;

          this._adminService.postTag(this.tagModel).subscribe( data  => {
            this.getAllTags();
          }),error => {
            console.log(error);
          }

          this.tagForm.reset();
      }
  }

  deleteTag(event:any)
  {
    this._adminService.deleteTag(event.target.value).subscribe( data => {
        this.getAllTags();
    }),error => {
      console.log(error);
    }
    
    this.tagForm.reset();
  }



}
