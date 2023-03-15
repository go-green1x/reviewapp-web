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

  constructor(public urls: UrlsService, private bconn: BasicService) { }

  login(username:any, password:any) {
    const body = {
      "username":username,
      "password":password
  }

    return this.bconn.post(this.urls.login(), body, this.urls.headerBeforeAuth(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  logout() {
    return this.bconn.get(this.urls.logout(), this.urls.header(), '', 0);
  }

  getToken() {
    if (JSON.parse(localStorage.getItem("LoggedInUser")!)) {
      return JSON.parse(localStorage.getItem("LoggedInUser")!).token;
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
      this.tokenDecoded = JSON.parse(atob(this.token.split('.')[1]));
      this.expiryTime = this.tokenDecoded.expiry * 1000;
      this.isLoggedIn = true;
    }
  }

  authFlow() {
    this.setTokenExpiry();
    this.logoutIfTokenExpired;
  }
}
