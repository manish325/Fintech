import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ILogin, ILoginResponse, IResponse, ISignup, ISignupErrors } from 'src/app/core/models/auth.types';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formSubmitted : boolean = false;
  
  //Login Flow
  passwordForgotten : boolean = false;
  firstTimeLogin : boolean = false;
  temporaryPasswordSent : boolean = true;
  
  loginForm =  new  FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  forgotPasswordForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )])
    })
    
  
  
    
  constructor(private http : HttpClient, private router : Router, private authService : AuthService, private _snackBar: MatSnackBar) {}

  login() {
    this.formSubmitted = true;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value as ILogin).subscribe({
      next : (response : any)=>{
        const token = response.token;
        localStorage.setItem('token', token);
        this.router.navigate(['user']);
        this.loginForm.reset();
        this.formSubmitted = false;
        this._snackBar.open('Logged In!', 'close');
    },
    error : (response : any)=>{
      this.formSubmitted = false;
      console.log(response)
      this._snackBar.open(response.error.message, 'close', {
        verticalPosition : 'bottom',
        horizontalPosition : 'center'
      });
    }
    })
  }

  

  forgottenPassword() {

  }

  handleSubmitAction() {
    if(this.temporaryPasswordSent) {
      this.passwordForgotten = false;
      this.temporaryPasswordSent = false;
    } else {
      this.forgottenPassword();
    }
  }
}
