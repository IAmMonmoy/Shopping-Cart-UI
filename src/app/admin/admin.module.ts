import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { TagsComponent } from './tags/tags.component';
import { ShipmentComponent } from './shipment/shipment.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AddProductComponent, AuthenticateComponent, TagsComponent, ShipmentComponent]
})
export class AdminModule { }
