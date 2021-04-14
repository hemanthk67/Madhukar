import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginPermissionsComponent } from './login-permissions/login-permissions.component';
import { ReviewPOComponent } from './review-po/review-po.component';
import { POComponent } from './review-po/po/po.component';


@NgModule({
  declarations: [LoginPermissionsComponent, ReviewPOComponent, POComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
