import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';;
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes : Routes = [
  { path: 'allProduct', component: AllProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: ShoppingCartComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})


export class UserRoutingModule { }
