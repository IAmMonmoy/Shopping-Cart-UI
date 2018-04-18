import { Component, OnInit } from '@angular/core';
import { Credential } from '../admin-models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  loginForm  : FormGroup;

  constructor(private fb: FormBuilder) {
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
  


}
