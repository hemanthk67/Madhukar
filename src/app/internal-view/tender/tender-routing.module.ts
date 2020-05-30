import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TenderComponent } from "./tender.component";
import { NewTenderComponent } from "./new-tender/new-tender.component";
import { TenderDocumentsComponent } from "./tender-documents/tender-documents.component";
import { TenderResultComponent } from './tender-result/tender-result.component';

const routes: Routes = [
  { path: "TenderList", component: TenderComponent },
  { path: "NewTender", component: NewTenderComponent },
  { path: "TenderDocuments", component: TenderDocumentsComponent },
  { path: "TenderResult", component: TenderResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule {}
