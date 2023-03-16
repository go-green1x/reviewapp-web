import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ValidationMessages } from 'src/app/shared/constants/constants';

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors?.['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private route: Router, private auth: AuthService,
    private ts: ToastService) {
    if (this.auth.isAuthenticated()) {
      this.route.navigateByUrl('/');
    }
  }

  public ValidationMessagesRef = ValidationMessages;
  signupform!: FormGroup;
  ngOnInit(): void {
    this.signupform = this.fb.group({
      username: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      profilePic: [''],
      fullName: ['', Validators.required],
      file: ['']
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupform.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit(form: any) {
    if (this.signupform) {
      if (this.signupform.valid) {
        let username = this.signupform.value['username'];
        const img = new FormData();
        img.append(username, this.signupform.value['profilePic']);


        let password = this.signupform.value['password'];
        let country = this.signupform.value['country'];
        let city = this.signupform.value['city'];
        let address = this.signupform.value['address'];
        let fullName = this.signupform.value['fullName'];
        let email = this.signupform.value['email'];
        let dateOfBirth = this.signupform.value['dateOfBirth'];

        let first_name = fullName.split(' ')[0];
        let last_name = fullName.substring(first_name.length);

        this.auth.signup(username, password, email, first_name, last_name, dateOfBirth, address,
          city, country, img).subscribe((result: any) => {
          if (result.status == 200) {
            // if (result.body.hasOwnProperty('token')) {
            //   form.reset();
            //   this.route.navigateByUrl('/');
            // }
            // else {
            //   this.ts.showToast('Something went wrong', 1000, undefined);
            // }
          }
        });
      }
    }
  }
}
