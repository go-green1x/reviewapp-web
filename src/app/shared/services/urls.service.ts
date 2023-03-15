import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

  url: string = 'http://192.168.0.104:8000/';

  public headerBeforeAuth() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

  public login() {
    return this.url + 'auth/login/';
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
}
