import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/auth/signin/signin.component';
import { BlankComponent } from './components/blank/blank.component';
import { NavBarComponent } from './components/navigation/nav-bar/nav-bar.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { SignupComponent } from './components/auth/signup/signup.component';

let customModules = [
  SigninComponent,
  BlankComponent,
  NavBarComponent,
  ToastComponent,
  SignupComponent
];

@NgModule({
  declarations: [
    customModules,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    customModules,
    NgbModule
  ]
})
export class SharedModule { }
