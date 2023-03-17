import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, IsSignedInGuard } from 'src/app/shared/guard/auth.guard';
import { SigninComponent } from 'src/app/shared/components/auth/signin/signin.component';
import { SignupComponent } from 'src/app/shared/components/auth/signup/signup.component';
import { BlankComponent } from 'src/app/shared/components/blank/blank.component';
import { Routes_URL } from 'src/app/shared//constants/routes';

const routes: Routes = [
  { path: Routes_URL.AUTH , component: BlankComponent,
    children: [
      { path: '' , redirectTo: Routes_URL.SIGN_IN,  pathMatch: 'full' },
      { path: Routes_URL.SIGN_IN , component: SigninComponent,  pathMatch: 'full', canActivate: [IsSignedInGuard] },
      { path: Routes_URL.SIGN_UP , component: SignupComponent,  pathMatch: 'full', canActivate: [IsSignedInGuard] }
    ]
  },
  { path: Routes_URL.BASE_URL , loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  // { path: Routes_URL.BASE_URL , redirectTo: Routes_URL.HOME,  pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
