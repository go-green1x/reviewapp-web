import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private fb: FormBuilder, private route: Router, private auth: AuthService,
    private ts: ToastService) {
    if (this.auth.isAuthenticated()) {
      this.route.navigateByUrl('/');
    }
  }

  loginform!: FormGroup;
  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: any) {
    let username = this.loginform.value['username'];
    let password = this.loginform.value['password'];

    if (this.loginform) {
      if (this.loginform.valid) {

        this.auth.login(username, password).subscribe((result: any) => {
          if (result.status == 200) {
            if (result.body.hasOwnProperty('token')) {
              form.reset();
              localStorage.setItem("LoggedInUser", JSON.stringify(result.body));
              this.auth.setTokenExpiry();
              this.auth.user = this.auth.setUserDetails();
              this.route.navigateByUrl('/');
            }
            else {
              this.ts.showToast('Invalid username or password', 1000, undefined);
            }
          }
        });

      }
    }
  }

}