import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './user-functions/all-products/all-products.component';

const routes : Routes = [
  { path: '' , component: AllProductsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
