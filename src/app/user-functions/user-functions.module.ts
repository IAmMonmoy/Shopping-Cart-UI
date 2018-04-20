import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserRoutingModule } from './/user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [AllProductsComponent, ProductComponent, ShoppingCartComponent]
})
export class UserFunctionsModule { }
