import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(private http: HttpClient,
    private routes: Router, private ta: ToastService) { }

  get(url: string, header: any, errorPath: any, duration: number, message: string = '', responseTypeParam: any = "json") {
    return this.http.get(url, { headers: header, observe: "response", responseType: responseTypeParam }).pipe(
      catchError(error => {
        return of(error);
      })
    );

  }

  post(url: string, body: any, header: any, errorPath: any, duration: number, message: string = '') {
    return this.http.post(url, body, { headers: header, observe: "response" }).pipe(
      catchError(error => {
        this.ta.showToast(message, duration, error, errorPath);
        return of(error);
      })
    );
  }
}
