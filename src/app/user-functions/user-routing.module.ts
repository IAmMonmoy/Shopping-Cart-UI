import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { Product } from '../shared/AllModels';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes : Routes = [
  { path: 'allProduct', component: AllProductsComponent },
  { path: 'product/:id', component: Product },
  { path: 'cart', component: ShoppingCartComponent }
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})


export class UserRoutingModule { }
