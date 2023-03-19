import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/home/home/home.component';

import { Routes_URL } from 'src/app/shared/constants/routes';
import { ProfileComponent } from 'src/app/home/profile/profile.component';
import { AboutUsComponent } from 'src/app/home/about-us/about-us.component';
import { ProductsComponent } from 'src/app/home/products/products.component';

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: Routes_URL.PROFILE , component: ProfileComponent},
  { path: Routes_URL.PRODUCTS , component: ProductsComponent},
  { path: Routes_URL.CONTACT_US , component: AboutUsComponent},
  { path: '**' , component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
