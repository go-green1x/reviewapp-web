import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

  // url: string = 'http://192.168.0.104:8000/';
  url: string = 'http://localhost:8000/';

  public headerBeforeAuth() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

  public login() {
    return this.url + 'auth/login/';
  }

  public signup() {
    return this.url + 'auth/create_user/';
  }

  public logout() {
    return this.url + 'auth/logout/';
  }

  public header() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + JSON.parse(localStorage.getItem("LoggedInUser")!).token
    });
    return headers;
  }

  public formHeadersBeforeLogin() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return headers;
  }

  public formHeadersAfterLogin() {
    let headers = new HttpHeaders({
      'Authorization': 'token ' + JSON.parse(localStorage.getItem("LoggedInUser")!).token
    });
    return headers;
  }

  public updateprofile() {
    return this.url + 'auth/updateprofile/';
  }

  public updatePassword() {
    return this.url + 'auth/updatepassword/';
  }

  public productsList() {
    return this.url + 'productAndReviews/product/';
  }

  public review() {
    return this.url + 'productAndReviews/review/';
  }

  public contactMail() {
    return this.url + 'productAndReviews/contactMail/';
  }
}
