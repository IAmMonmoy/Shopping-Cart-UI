import { Component, OnInit } from '@angular/core';
import { Credential } from '../admin-models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminServiceService } from '../services/admin-service.service';
import { error } from 'protractor';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  loginForm  : FormGroup;
  credential : Credential;
  isRequesting : boolean;

  constructor(private fb: FormBuilder, private _adminServices: AdminServiceService) {
   }

  ngOnInit() {
    this.createForm();
  }

  createForm()
  {
    this.loginForm = this.fb.group({
        email : ['', [ Validators.required,
                       Validators.email
                     ]
                ],
        password : ['', [ Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(100)
                        ]
                    ]
    });
  }
  onSubmit()
  {
    if(this.loginForm.valid)
    {
      this.credential = new Credential();
      this.credential.email = this.loginForm.controls.email.value;
      this.credential.password = this.loginForm.controls.password.value;

      this.isRequesting = true;

      this._adminServices.login(this.credential).subscribe(
        data => {
          this.isRequesting = false;
          this._adminServices.storeToken(data);
          console.log(data);
        },
        error => {
          console.log(error);
          this.isRequesting = false;
        }
      );
      this.loginForm.reset();
    }
  }
  


}
