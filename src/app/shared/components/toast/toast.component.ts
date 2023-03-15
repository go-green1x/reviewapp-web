import { Component } from '@angular/core';

import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  constructor(public toastService: ToastService) {}

}
