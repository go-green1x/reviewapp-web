import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    AboutUsComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
