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
  @ViewChild("signInForm") signInForm: NgForm;
  @ViewChild("signUpForm") signUpForm: NgForm;

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
    let authObservable: Observable<AuthResponse>;
    this.isLoading = true;

    if (this.authMode=="Sign In")
    {
      const {username, password} = this.signInForm.form.value;
      authObservable  = this.authService.signIn(username, password);

      this.signInForm.reset();
    }
    else
    {
      const {username, password, email} = this.signUpForm.form.value;

      authObservable = this.authService.signUp(username, email, password);

      this.signUpForm.resetForm();
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
  }

  private handleAuthenticationError(errorRes)
  {
    this.errorMsg = "An unknown error occurs!"

    if (errorRes.status) {
      switch (errorRes.status) {
        case 401:
          this.errorMsg = 'Login failed!';
          break;
        case 403:
          if (errorRes.error){
            const failedAttribute = Object.keys(errorRes.error)[0];
            this.errorMsg = failedAttribute + ': '+ errorRes.error[failedAttribute];
          }
          break;
      }
    }
  }

}
