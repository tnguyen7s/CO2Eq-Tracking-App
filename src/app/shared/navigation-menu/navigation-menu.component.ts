import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {
  isExpanding = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onExpandRecordEmissionMenu(){
    this.isExpanding = !this.isExpanding;
  }

  onLogout(){
    localStorage.removeItem("userData");
    this.authService.logOut();
  }

}
