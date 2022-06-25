import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { AuthService } from "../auth/auth.service";
import { Account } from "../shared/models/account.model";

const BACKEND_URL = environment.APP_BACK_END_BASE_URL + "/auth/account"
@Injectable({
  providedIn: "root"
})
export class AccountService
{
  userAccount = new BehaviorSubject<Account>(null);
  constructor(private http: HttpClient, private authService: AuthService){
    // once the app is launch, user account is fetch and userAccount class variable is initialized
    this.fetchUserAccountFromDb();
  }

  // FETCH
  fetchUserAccountFromDb()
  {
    this.http.get<Account>(BACKEND_URL, {
      headers: new HttpHeaders().append('Authorization', `Token ${this.authService.getToken()}`)
    }).
    subscribe((res)=>{
      console.log(res);
      this.userAccount.next(res);
    },
    (error)=>{
      console.log(error);
    })
  }

  // SAVE
  saveUserAccountToDb(newAccount: Account)
  {
    // not save if user account's username and email is empty
    if (!newAccount.username) newAccount.username = this.userAccount.value.username;
    if (!newAccount.email) newAccount.email = this.userAccount.value.email;

    this.http.put<Account>(BACKEND_URL, newAccount,{
      headers: new HttpHeaders().append('Authorization', `Token ${this.authService.getToken()}`)
    }).
    subscribe((res)=>{
      console.log(res);
      this.userAccount.next(newAccount.clone());
    },
    (error)=>{
      console.log(error);
    })
  }
}
