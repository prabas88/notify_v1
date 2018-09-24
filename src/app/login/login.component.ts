import { Component, OnInit,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from '../api.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
    constructor(public router: Router,private formBuilder: FormBuilder,private apiService:ApiService) {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', [Validators.required]]
      });
    }

    ngOnInit() {}

    onLoggedin() {
        //localStorage.setItem('isLoggedin', 'true');
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }
      this.apiService.login(JSON.stringify(this.loginForm.value)).subscribe((data:  any) => {
        console.log(data.result.code);
        if(data.result.code!=0){
          alert(data.result.description);
          return;
        }
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('userInfo', JSON.stringify(data.payload));
        this.router.navigateByUrl('/dashboard');

      });

    }
  get f() { return this.loginForm.controls; }
}
