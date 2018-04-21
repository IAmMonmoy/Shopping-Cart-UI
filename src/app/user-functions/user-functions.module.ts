import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserRoutingModule } from './/user-routing.module';
import { CommonService } from '../shared/services/common.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  providers: [ CommonService ],
  declarations: [AllProductsComponent, ShoppingCartComponent, ProductDetailComponent]
})
export class UserFunctionsModule { }
