import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, Router } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { TagsComponent } from './tags/tags.component';
import { ShipmentComponent } from './shipment/shipment.component';

const routes : Routes = [
  { path: 'product' , component: AddProductComponent },
  { path: 'login' , component: AuthenticateComponent },
  { path: 'tags' , component: TagsComponent},
  { path: 'shipment', component: ShipmentComponent}
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
