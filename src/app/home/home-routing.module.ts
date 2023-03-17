import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/home/home/home.component';

import { Routes_URL } from 'src/app/shared/constants/routes';
import { BlankComponent } from 'src/app/shared/components/blank/blank.component';
import { ProfileComponent } from 'src/app/home/profile/profile.component';

const routes: Routes = [
  { path: Routes_URL.BASE_URL , component: BlankComponent,  pathMatch: 'prefix',
    children: [
      { path: '' , component: HomeComponent},
      { path: Routes_URL.PROFILE , component: ProfileComponent},
      { path: '**' , component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
