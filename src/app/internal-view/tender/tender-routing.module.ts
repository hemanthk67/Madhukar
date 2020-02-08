import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TenderComponent } from "./tender.component";
import { NewTenderComponent } from "./new-tender/new-tender.component";

const routes: Routes = [
  { path: "", component: TenderComponent },
  { path: "NewTender", component: NewTenderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule {}
