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

  login(username: any, password: any) {
    const body = {
      "username": username,
      "password": password
    }

    return this.bconn.post(this.urls.login(), body, this.urls.headerBeforeAuth(), '', 1000, EMessages.INVALID_USERNAME_PASSWORD);
  }

  signup(formData: any) {
    const body = formData 
    return this.bconn.post(this.urls.signup(), body,this.urls.formHeadersBeforeLogin(), 'error.error.username[0]', 1000);
  }

  logout() {
    const body = {};
    return this.bconn.post(this.urls.logout(), body, this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  getLoggedInUser() {
    if (JSON.parse(localStorage.getItem("LoggedInUser")!)) {
      return JSON.parse(localStorage.getItem("LoggedInUser")!);
    }
    return null;
  }

  getToken() {
    let token = this.getLoggedInUser().token;
    if (token) {
      return token;
    }
    return null;
  }

  getTokenExpiry() {
    let expiry = this.getLoggedInUser().expiry;
    if (expiry) {
      return expiry;
    }
    return null;
  }

  setUserDetails() {
    let userDetails = this.getLoggedInUser().userDetails;
    if (userDetails) {
      if (userDetails?.profile?.upload) {
        userDetails.profile.upload = this.urls.url + '/' + userDetails?.profile?.upload;
      }
      return userDetails;
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
    this.user = this.setUserDetails();
    this.logoutIfTokenExpired;
  }

  updateProfilePic(formData: any) {
    const body = formData 
    return this.bconn.put(this.urls.updateprofile(), body,this.urls.formHeadersAfterLogin(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  updateProfile(formData: any) {
    const body = formData 
    return this.bconn.put(this.urls.updateprofile(), body,this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }
}
