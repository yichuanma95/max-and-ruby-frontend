import {Injectable} from '@angular/core';
import {EpisodeServiceClient} from '../services/EpisodeServiceClient';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

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
      localStorage.removeItem("admin");
      this.loggedIn = false;
      this.loginChanged.next(this.loggedIn);
      this.router.navigate(["/"]);
    });
  }

  constructor(private episodeServiceClient: EpisodeServiceClient, private router: Router) { }
}
