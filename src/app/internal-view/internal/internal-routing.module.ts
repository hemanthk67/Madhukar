import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InternalComponent } from "./internal.component";

const routes: Routes = [{ path: "", component: InternalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalRoutingModule {}
