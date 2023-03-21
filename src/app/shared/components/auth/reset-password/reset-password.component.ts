import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ValidationMessages } from 'src/app/shared/constants/constants';
import { ConfirmedValidator } from 'src/app/shared/validators/confirm.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private fb: FormBuilder, private route: Router, private auth: AuthService,
    private ts: ToastService) {
  }

  public ValidationMessagesRef = ValidationMessages;
  resetPasswordForm!: FormGroup;
  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  onSubmit(form: any) {
    if (this.resetPasswordForm) {
      if (this.resetPasswordForm.valid) {

        let oldPassword = this.resetPasswordForm.value['oldPassword'];
        let password = this.resetPasswordForm.value['password'];
        let confirmPassword = this.resetPasswordForm.value['confirmPassword'];

        let payload = {
          "old_password": oldPassword,
          "new_password": password,
          "confirm_new_password": confirmPassword
        };
        this.auth.updatePassword(payload).subscribe((result: any) => {
          if (result.ok == true) {
            form.reset();
            this.ts.showToast('Password Updated Successsfullt', 3000, undefined);
          }
        });
      }
    }
  }

}
