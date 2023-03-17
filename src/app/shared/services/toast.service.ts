import { Injectable } from '@angular/core';
import { EMessages } from 'src/app/shared/constants/constants';
export interface ToastInfo {
  header: string;
  body: string;
  delay: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastInfo[] = [];

  constructor() { }

  showToast(message: string = '', delay: number, error: any, errorPath: any = '', header: string = '') {
    let body = message != "" ? message : eval(errorPath);
    if (typeof(body) != 'string') {
      body = EMessages.SOMETHING_WENT_WRONG;
    }
    this.toasts.push({ header, body, delay });
  }

  removeToast(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
