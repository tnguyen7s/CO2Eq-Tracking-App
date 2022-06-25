import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {
  public isExpanding = false;
  public image: string = null;
  public nameCalled: string;
  private sub: Subscription;

  constructor(private authService: AuthService, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    // load account image
    this.image = localStorage.getItem("image");
    this.sub = this.accountService.userAccount.subscribe((value)=>{
      const name = value.first_name+" " +value.last_name;
      this.nameCalled = value.first_name || value.last_name? name:value.username;
    })
  }

  onExpandRecordEmissionMenu(){
    this.isExpanding = !this.isExpanding;
  }

  onLogout(){
    localStorage.removeItem("userData");
    this.authService.logOut();
  }

}
