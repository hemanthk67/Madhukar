import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InternalRoutingModule } from "./internal-routing.module";
import { InternalComponent } from "./internal.component";
import { InternalNavBarComponent } from "./internal-nav-bar/internal-nav-bar.component";

@NgModule({
  declarations: [InternalComponent, InternalNavBarComponent],
  imports: [CommonModule, InternalRoutingModule]
})
export class InternalModule {}
