import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { CommonComponentsModule } from "../common-components/common-components.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    CommonComponentsModule
  ]
})
export class AuthModule {}
