import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild("authForm") authForm: NgForm;
  authMode = "Sign In"
  isLoading = false;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchAuthmode(){
    this.authMode = (this.authMode=="Sign In")? "Sign Up": "Sign In";
  }

  onAuthenticate()
  {
    const {email, password} = this.authForm.form.value;
    
    let authObservable: Observable<AuthResponse>;
    this.isLoading = true;

    if (this.authMode=="Sign In")
    {
      authObservable  = this.authService.signIn(email, password);
    }
    else
    {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      (authRes)=>{
        console.log(authRes);
        this.isLoading = false;
        this.router.navigate(["/"])
      },
      (errorRes) =>{
        console.log(errorRes);
        this.handleAuthenticationError(errorRes);
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }

  private handleAuthenticationError(errorRes)
  {
    this.errorMsg = "An unknown error occurs!"

    if (errorRes.error && errorRes.error.error) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          this.errorMsg = 'This email already exists!';
          break;
        case 'INVALID_PASSWORD':
          this.errorMsg = 'This password is invalid!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          this.errorMsg =
            'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        case 'EMAIL_NOT_FOUND':
          this.errorMsg = 'This email does not exist';
      }
    }
  }

}
