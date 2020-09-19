import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  loggedIn = false;
  loginSub: Subscription;

  onLogOut() {
    this.authService.logout();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem("admin") === "true";
    this.loginSub = this.authService.loginChanged.subscribe(change => {
      this.loggedIn = change;
    });
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }
}
