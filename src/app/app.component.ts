import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'eCO2-Tracker-App';
  isAuthenticated = false;
  sub: Subscription;

  constructor(private authService: AuthService)
  {
  }

  ngOnInit()
  {
    this.sub = this.authService.user.subscribe((user)=>{
      console.log(user);
      if (user && user.token)
      {
        this.isAuthenticated = true;
      }
      else
      {
        this.isAuthenticated = false;
      }
    });

    this.authService.autoSignIn();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
