import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISignup } from 'src/app/core/models/auth.types';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  otpSent: boolean = false;
  signupForm = new FormGroup({
    personalInformation: new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      dateOfBirth: new FormControl(),
    }),

    contactInformation: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )]),
      address: new FormControl(),
    }),

    accountInformation: new FormGroup({
      aadhar: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]),
      pan: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  });
  otpFormControl = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {
    this.matchPasswordValidator()
  }

  getOtp() {
    // this.formSubmitted = true;
    // if(this.signupForm.valid) {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value as ISignup).subscribe({
      next: (response?: any) => {
        this._snackBar.open(response.message, 'okay');
        // this.formSubmitted = false;
        this.otpSent = true;

      },
      error: (response: any) => {
        // this.formSubmitted = false;
        response.errors?.map((e: string) => {
          // if(e.includes('aadhar')) {

          // } else if(e.includes(''))
          this._snackBar.open('Something went wrong, please try again!', 'Okay')
        })
      }
    })
    // }
  }

  register() {
    
  }

  handleSubmitActions() {
    if(this.otpSent) {
      this.register();
    } else  {
      this.getOtp();
    }
  }

  // Custom validator function to check if passwords match
  matchPasswordValidator()  {
    this.signupForm.get('accountInformation')?.valueChanges.subscribe({
      next : (val)=>{
        const confirmPassword = this.signupForm.get('accountInformation')?.get('confirmPassword');
        if((val.password && val.confirmPassword) && (val.password !== val.confirmPassword )) {
          confirmPassword?.setErrors({
            mismatch : true
          })
        } else if((val.password && val.confirmPassword) && (val.password === val.confirmPassword )) {
          confirmPassword?.setErrors(null);
        }
      }
    })
  }

}
