import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductionListComponent } from "./production-list/production-list.component";
import { ProductionComponent } from "./production.component";

const routes: Routes = [
  { path: "", component: ProductionComponent },
  { path: "ProductionList", component: ProductionListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}
