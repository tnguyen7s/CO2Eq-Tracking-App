import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

const BACKEND_AUTH = {
  SIGNUP_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
  SIGNIN_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
  API_KEY: "AIzaSyDl1DhtJYpUyxWijcHujqPv9QI27AEmtlQ"
}

export interface AuthResponse{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService{
  // user object helps identify if user has authenticated: allow navigation menu, allow to other routes, allow response from servers 
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router)
  {
  }

  signUp(email: string, password: string)
  {
    return this.http.post<AuthResponse>(BACKEND_AUTH.SIGNUP_URL + BACKEND_AUTH.API_KEY, {
      "email": email,
      "password": password,
      "returnSercureToken": true
    })
    .pipe(
      tap(
        resData=> this.handleAuthentication(resData)
    ));
  }

  signIn(email: string, password: string)
  {
    return this.http.post<AuthResponse>(BACKEND_AUTH.SIGNIN_URL + BACKEND_AUTH.API_KEY, {
      "email": email,
      "password": password,
      "returnSercureToken": true
    })
    .pipe(tap(resData=> this.handleAuthentication(resData)));
  }

  autoSignIn()
  {
    const loadedData = JSON.parse(localStorage.getItem("userData"));

    if (!loadedData) return;

    const user = new User(loadedData.email, loadedData.userId, loadedData._token, new Date(loadedData._tokenExpirationDate));

    if (user.token)
    {
      this.user.next(user);
    }

    const expirationDuration = new Date(loadedData._tokenExpirationDate).getTime()-new Date().getTime();
    this.autoLogOut(expirationDuration);
  }

  private handleAuthentication(resData: AuthResponse)
  {
    const expiresIn = 3600*1000;//millisecond
    const expirationDate = new Date(new Date().getTime() + expiresIn);

    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    this.user.next(user);

    this.autoLogOut(expiresIn);

    localStorage.setItem("userData", JSON.stringify(user));
  }

  logOut()
  {
    this.user.next(null);

    if (this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
    this.router.navigate(['auth']);
  }

  autoLogOut(expirationDuration: number)
  {
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logOut();
    }, expirationDuration);
  }

}
