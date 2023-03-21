import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ValidationMessages } from 'src/app/shared/constants/constants';
import { Routes_URL } from 'src/app/shared/constants/routes';
import { UrlsService } from 'src/app/shared/services/urls.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private fb: FormBuilder, private route: Router, public auth: AuthService,
    private ts: ToastService, private urls: UrlsService) {
  }

  public routes_url = Routes_URL;
  public ValidationMessagesRef = ValidationMessages;
  profileForm!: FormGroup;
  user = this.auth.user;
  profilePic: any = this.user?.profile.upload;
  edit: boolean = false;
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [{ value: this.user?.username, disabled: true }, [Validators.required]],
      country: [{ value: this.user?.profile?.country, disabled: !this.edit }, Validators.required],
      city: [{ value: this.user?.profile?.city, disabled: !this.edit }, Validators.required],
      address: [{ value: this.user?.profile?.address, disabled: !this.edit }, Validators.required],
      email: [{ value: this.user?.email, disabled: !this.edit }, [Validators.required, Validators.email]],
      dateOfBirth: [{ value: this.user?.profile?.date_of_birth, disabled: !this.edit }, Validators.required],
      fullName: [{ value: this.user?.first_name + ' ' + this.user?.last_name, disabled: !this.edit }, Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const uploadImage = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.profilePic = reader.result;
      reader.readAsDataURL(uploadImage);

      let uploadImageNameArr = uploadImage.name.split('.');
      const formData = new FormData();
      formData.append('upload', uploadImage, this.user?.username + '.' + uploadImageNameArr[uploadImageNameArr.length - 1]);

      this.auth.updateProfilePic(formData).subscribe((result: any) => {
        if (result.ok == true) {
          this.ts.showToast('Picture Updated', 1000, undefined);

          let userObj = this.auth.getLoggedInUser();
          if (userObj.userDetails?.profile?.upload) {
            userObj.userDetails.profile.upload = result.body.upload;
            localStorage.setItem("LoggedInUser", JSON.stringify(userObj));
          }

          if (this.user?.profile.upload) {
            this.auth.user!.profile!.upload = this.urls.url + '/' + result.body.upload;
          }
        }
      });

    }
  }

  onSubmit(form: any) {
    if (this.profileForm) {
      if (this.profileForm.valid) {
        let username = this.profileForm.value['username'];
        let country = this.profileForm.value['country'];
        let city = this.profileForm.value['city'];
        let address = this.profileForm.value['address'];
        let fullName = this.profileForm.value['fullName'];
        let email = this.profileForm.value['email'];
        let dateOfBirth = this.profileForm.value['dateOfBirth'];

        let first_name = fullName.split(' ')[0];
        let last_name = fullName.substring(first_name.length);

        let payload = {
          "email" : email,
          "first_name" : first_name,
          "last_name" : last_name,
          "country" : country,
          "city" : city,
          "address" : address,
          "date_of_birth" : dateOfBirth
        }

        this.auth.updateProfilePic(payload).subscribe((result: any) => {
          if (result.ok == true) {
            this.toggleEdit();
            this.ts.showToast('Profile Updated', 1000, undefined);

            let userObj = this.auth.getLoggedInUser();
            if (userObj.userDetails) {
              userObj.userDetails.profile.address = result.body.address;
              userObj.userDetails.profile.city = result.body.city;
              userObj.userDetails.profile.date_of_birth = result.body.date_of_birth;
              userObj.userDetails.profile.country = result.body.country;
              userObj.userDetails.email = result.body.email;
              userObj.userDetails.first_name = result.body.first_name;
              userObj.userDetails.last_name = result.body.last_name;
              localStorage.setItem("LoggedInUser", JSON.stringify(userObj));
            }
  
            if (this.user?.profile.upload) {
              this.auth.user!.profile!.address = this.urls.url + '/' + result.body.address;
              this.auth.user!.profile!.city = this.urls.url + '/' + result.body.city;
              this.auth.user!.profile!.country = this.urls.url + '/' + result.body.country;
              this.auth.user!.profile!.date_of_birth = this.urls.url + '/' + result.body.date_of_birth;
              this.auth.user!.email = this.urls.url + '/' + result.body.email;
              this.auth.user!.first_name = result.body.first_name;
              this.auth.user!.last_name = result.body.last_name;
            }

          }
        });
      }
    }
  }

  toggleEdit() {
    if (!this.edit) {
      this.profileForm.get('country')?.enable();
      this.profileForm.get('city')?.enable();
      this.profileForm.get('address')?.enable();
      this.profileForm.get('fullName')?.enable();
      this.profileForm.get('email')?.enable();
      this.profileForm.get('dateOfBirth')?.enable();
    }
    else {
      this.profileForm.get('country')?.disable();
      this.profileForm.get('city')?.disable();
      this.profileForm.get('address')?.disable();
      this.profileForm.get('fullName')?.disable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('dateOfBirth')?.disable();
    }
    this.edit = !this.edit;
  }

}
