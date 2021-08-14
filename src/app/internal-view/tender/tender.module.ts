import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TenderRoutingModule } from "./tender-routing.module";
import { TenderComponent } from "./tender.component";
import { NewTenderComponent } from "./new-tender/new-tender.component";
import { CommonComponentsModule } from "src/app/common-components/common-components.module";
import { TenderDocumentsComponent } from "./tender-documents/tender-documents.component";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { UploadDocumentsComponent } from "./tender-documents/documents/upload-documents/upload-documents.component";
import { CoveringLetterComponent } from "./tender-documents/documents/covering-letter/covering-letter.component";
import { CompleteTenderComponent } from "./tender-documents/documents/complete-tender/complete-tender.component";
import { TenderResultComponent } from "./tender-result/tender-result.component";
import { TenderQueryComponent } from "./tender-result/tender-query/tender-query.component";
import { ResultsComponent } from "./tender-result/results/results.component";

@NgModule({
  declarations: [
    TenderComponent,
    NewTenderComponent,
    TenderDocumentsComponent,
    UploadDocumentsComponent,
    CoveringLetterComponent,
    CompleteTenderComponent,
    TenderResultComponent,
    TenderQueryComponent,
    ResultsComponent,
  ],
  imports: [
    CommonModule,
    TenderRoutingModule,
    CommonComponentsModule,
    MatIconModule,
    FormsModule,
  ],
})
export class TenderModule {}
