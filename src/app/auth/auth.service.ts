import {Injectable} from '@angular/core';
import {EpisodeServiceClient} from '../services/EpisodeServiceClient';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Location} from '@angular/common';

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedIn = localStorage.getItem("admin") === "true";
  loginChanged = new Subject<boolean>();

  login(user) {
    this.episodeServiceClient.login(user).then(response => {
      if (response === 1) {
        localStorage.setItem("admin", "true");
        this.loggedIn = true;
        this.loginChanged.next(this.loggedIn);
        this.router.navigate(["/"]);
      } else {
        let alertBox = document.getElementById("wrong-cred");
        alertBox.classList.remove("d-none");
      }
    });
  }

  logout() {
    this.episodeServiceClient.logout().then(_ => {
      this.logOutInClient();
      this.router.navigate(["/"]);
    });
  }

  autoLogoutFromHome() {
    this.episodeServiceClient.verifySession().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.logOutInClient();
      }
    });
  }

  closeExpiredSession() {
    this.autoLogout();
    this.navigateToLogin();
  }

  autoLogout() {
    this.episodeServiceClient.verifySession().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.logOutInClient();
        this.router.navigate(["/login"])
      }
    });
  }

  private logOutInClient() {
    localStorage.removeItem("admin");
    this.loggedIn = false;
    this.loginChanged.next(this.loggedIn);
  }

  showAlert(id) {
    let alertElem = document.getElementById(id);
    alertElem.classList.remove('d-none');
    alertElem.classList.add('show');
  }

  closeAlert(id) {
    let alertElem = document.getElementById(id);
    alertElem.classList.remove("show");
    setTimeout(() => {
      alertElem.classList.add("d-none");
    }, 250);
  }

  cancelEdit() {
    this.closeExpiredSession();
    this.location.back();
  }

  navigateToLogin() {
    if (localStorage.getItem('admin') === null) {
      this.router.navigate(['/login']).then(_ => {
        this.loggedIn = false;
        this.loginChanged.next(this.loggedIn);
      });
    }
  }

  constructor(private episodeServiceClient: EpisodeServiceClient, private router: Router, private location: Location) { }
}
