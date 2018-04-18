import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, Router } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';

const routes : Routes = [
  { path: 'product' , component: AddProductComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule { }
