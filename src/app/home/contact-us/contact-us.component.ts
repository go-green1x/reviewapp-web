import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from 'src/app/shared/constants/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PpService } from 'src/app/shared/services/pp.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private fb: FormBuilder, private ts: ToastService, private auth: AuthService,
    private pp: PpService) {
  }
  contactForm!: FormGroup;
  public ValidationMessagesRef = ValidationMessages;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.contactForm.patchValue({
      fullName: this.auth.user.first_name + ' ' + this.auth.user.last_name,
      email: this.auth.user.email
    });
  }

  onSubmit(form: any) {
    if (this.contactForm) {
      if (this.contactForm.valid) {
        let fullName = this.contactForm.value['username'];
        let email = this.contactForm.value['email'];
        let subject = this.contactForm.value['subject'];
        let message = this.contactForm.value['message'];

        let payload = {
          "email": email,
          "fullname": fullName,
          "subject": subject,
          "message": message
        }

        this.pp.contactInquiry(payload).subscribe((result: any) => {
          if (result.ok == true) {
            this.contactForm.patchValue({
              subject: '',
              message: ''
            });
            this.ts.showToast('Email Sent', 3000, undefined);
          }
        });
      }
    }
  }

}
