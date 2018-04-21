import { Component, OnInit } from '@angular/core';
import { Credential } from '../../shared/AllModels';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminServiceService } from '../services/admin-service.service';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  loginForm  : FormGroup;
  credential : Credential;
  isRequesting : boolean;

  constructor(private fb: FormBuilder, private _adminServices: AdminServiceService, private route: Router) {
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
          this.route.navigate(['/allProduct']);
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
