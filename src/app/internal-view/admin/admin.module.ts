import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { LoginPermissionsComponent } from "./login-permissions/login-permissions.component";
import { PoReviewComponent } from "./po-review/po-review.component";

import { MatIconModule } from "@angular/material/icon";
import { CommonComponentsModule } from "src/app/common-components/common-components.module";

@NgModule({
  declarations: [
    LoginPermissionsComponent,
    PoReviewComponent,
    PoReviewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    CommonComponentsModule,
  ],
})
export class AdminModule {}
