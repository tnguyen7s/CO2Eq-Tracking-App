import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {
  public isExpanding = false;
  public image: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // load account image
    this.image = localStorage.getItem("image");
  }

  onExpandRecordEmissionMenu(){
    this.isExpanding = !this.isExpanding;
  }

  onLogout(){
    localStorage.removeItem("userData");
    this.authService.logOut();
  }

}
