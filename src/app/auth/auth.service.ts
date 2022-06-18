import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { User } from "./user.model";

const BACKEND_AUTH = {
  SIGNUP_URL: environment.APP_BACK_END_BASE_URL + "/auth/signup",
  SIGNIN_URL: environment.APP_BACK_END_BASE_URL + "/auth/login",
}

export interface AuthResponse{
  id: number;
  username: string;
  email: string;
  refresh_token: string;
  token_expiration_date: string;
  first_name?: string;
  last_name?: string;
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

  signUp(username: string, email: string, password: string)
  {
    return this.http.post<AuthResponse>(BACKEND_AUTH.SIGNUP_URL, {
      "username": username,
      "password": password,
      "email": email,
      "first_name": "Unknown",
      "last_name": "Unknown"
    })
    .pipe(
      tap(
        resData=> this.handleAuthentication(resData)
    ));
  }

  signIn(username: string, password: string)
  {
    return this.http.post<AuthResponse>(BACKEND_AUTH.SIGNIN_URL, {
      "username": username,
      "password": password,
    })
    .pipe(tap(resData=> this.handleAuthentication(resData)));
  }

  autoSignIn()
  {
    const loadedData = JSON.parse(localStorage.getItem("userData"));

    if (!loadedData) return;

    const user = new User(loadedData.userId, loadedData.username, loadedData.email,  loadedData._token, new Date(loadedData._tokenExpirationDate));

    if (user.token)
    {
      this.user.next(user);
    }

    const expirationDuration = new Date(loadedData._tokenExpirationDate).getTime()-new Date().getTime();
    this.autoLogOut(expirationDuration);
  }

  private handleAuthentication(resData: AuthResponse)
  {
    const user = new User(resData.id, resData.username, resData.email,resData.refresh_token, new Date(resData.token_expiration_date));
    this.user.next(user);

    const expiresIn = user.tokenExpirationDate.getTime() - new Date().getTime();
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

  getToken(){
    let token: string;
    this.user.subscribe((user)=> {
      token = user.token;
    })

    return token;
  }

  getUserId()
  {
    let id: number;
    this.user.subscribe((user)=> {
      id = user.userId;
    })

    return id
  }

}
