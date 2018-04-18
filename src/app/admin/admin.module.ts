import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthenticateComponent } from './authenticate/authenticate.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AddProductComponent, AuthenticateComponent]
})
export class AdminModule { }
