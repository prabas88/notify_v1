import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from '../api.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,private apiService:ApiService) {}

    ngOnInit() {
      /*this.apiService.register().subscribe((data:  any) => {
        console.log(data);
      });*/
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mobile: ['', Validators.required],
        domainName: ['', Validators.required],
        domainType: ['0'],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });

    }

    get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("in:onSubmit")
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.apiService.register(JSON.stringify(this.registerForm.value)).subscribe((data:  any) => {
      console.log(data);
    });

  }

}
