import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuardService as AuthGuard } from '../admin/services/auth-guard.service';

const routes : Routes = [
  { path: 'allProduct', component: AllProductsComponent},
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: ShoppingCartComponent, canActivate:[AuthGuard] }
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
