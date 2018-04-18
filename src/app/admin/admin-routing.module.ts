import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, Router } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { TagsComponent } from './tags/tags.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes : Routes = [
  { path: 'addProduct' , component: AddProductComponent , canActivate : [AuthGuard]},
  { path: 'login' , component: AuthenticateComponent },
  { path: 'tags' , component: TagsComponent, canActivate : [AuthGuard]},
  { path: 'shipment', component: ShipmentComponent, canActivate : [AuthGuard]}
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
