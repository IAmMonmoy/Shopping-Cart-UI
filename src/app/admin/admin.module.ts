import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { TagsComponent } from './tags/tags.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AdminServiceService } from './services/admin-service.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { RoleGuardService } from './services/role-guard.service';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers : [
    AdminServiceService,
    AuthService,
    AuthGuardService,
    RoleGuardService
  ]
  ,
  declarations: [AddProductComponent, AuthenticateComponent, TagsComponent, ShipmentComponent]
})
export class AdminModule { }
