import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ValidationMessages } from 'src/app/shared/constants/constants';
import { Routes_URL } from 'src/app/shared/constants/routes';
import { ConfirmedValidator } from 'src/app/shared/validators/confirm.validator';

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

  public routes_url = Routes_URL;
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
      profilePic: ['', Validators.required],
      fullName: ['', Validators.required],
      file: ['', Validators.required]
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupform.patchValue({
        profilePic: file
      });
    }
  }

  onSubmit(form: any) {
    if (this.signupform) {
      if (this.signupform.valid) {
        let username = this.signupform.value['username'];
        let password = this.signupform.value['password'];
        let country = this.signupform.value['country'];
        let city = this.signupform.value['city'];
        let address = this.signupform.value['address'];
        let fullName = this.signupform.value['fullName'];
        let email = this.signupform.value['email'];
        let dateOfBirth = this.signupform.value['dateOfBirth'];

        let first_name = fullName.split(' ')[0];
        let last_name = fullName.substring(first_name.length);
        let uploadImage = this.signupform?.get('profilePic')?.value;
        let uploadImageNameArr = uploadImage.name.split('.');

        const formData = new FormData();
        formData.append('username', username);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profile.date_of_birth', dateOfBirth);
        formData.append('profile.address', address);
        formData.append('profile.city', city);
        formData.append('profile.country', country);
        formData.append('profile.upload', uploadImage, username + '.' + uploadImageNameArr[uploadImageNameArr.length-1]);

        this.auth.signup(formData).subscribe((result: any) => {
          if (result.ok == true) {
              form.reset();
              this.ts.showToast('Account Created Successsfullt', 1000, undefined);
          }
        });
      }
    }
  }
}
