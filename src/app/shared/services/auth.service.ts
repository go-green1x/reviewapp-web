import { Injectable } from '@angular/core';

import { UrlsService } from 'src/app/shared/services/urls.service';
import { BasicService } from 'src/app/shared/services/basic.service';
import { EMessages } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  isLoggedIn: boolean = false;
  token: any = null;
  tokenDecoded: any;
  expiryTime: any;
  user: any;

  constructor(public urls: UrlsService, private bconn: BasicService) { }

  login(username:any, password:any) {
    const body = {
      "username":username,
      "password":password
  }

    return this.bconn.post(this.urls.login(), body, this.urls.headerBeforeAuth(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  logout() {
    const body = {};
    return this.bconn.post(this.urls.logout(), body, this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  getToken() {
    if (JSON.parse(localStorage.getItem("LoggedInUser")!)) {
      return JSON.parse(localStorage.getItem("LoggedInUser")!).token;
    }
    return null;
  }

  getTokenExpiry() {
    if (JSON.parse(localStorage.getItem("LoggedInUser")!)) {
      return JSON.parse(localStorage.getItem("LoggedInUser")!).expiry;
    }
    return null;
  }

  setUserDetails() {
    if (JSON.parse(localStorage.getItem("LoggedInUser")!)) {
      return JSON.parse(localStorage.getItem("LoggedInUser")!).userDetails;
    }
    return null;
  }

  removetoken() {
    localStorage.removeItem("LoggedInUser");
    this.isLoggedIn = false;
    this.token = null;
  }

  logoutIfTokenExpired() {
    if (this.isAuthenticated() == false) {
      this.removetoken();
      return true;
    }
    else {
      this.isLoggedIn = true;
      return false;
    }
  }

  isAuthenticated() {
    if (this.token != null) {
      let currenttime = new Date().getTime();
      return !(currenttime > this.expiryTime);
    }
    return false;
  }

  setTokenExpiry() {
    this.token = this.getToken();
    if (this.token != null) {
      this.expiryTime = new Date(this.getTokenExpiry()).getTime();
      this.isLoggedIn = true;
    }
  }

  authFlow() {
    this.setTokenExpiry();
    this.logoutIfTokenExpired;
  }
}
