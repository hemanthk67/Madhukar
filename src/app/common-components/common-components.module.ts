import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PdfViewComponent } from "./internal/pdf-view/pdf-view.component";
import { PdfPreviewComponent } from "./internal/pdf-preview/pdf-preview.component";
import { MatIconModule } from "@angular/material/icon";
import { LogoComponent } from "./logo/logo.component";
import { CalenderComponent } from "./internal/calender/caleander.component";

@NgModule({
  declarations: [
    PdfViewComponent,
    PdfPreviewComponent,
    LogoComponent,
    CalenderComponent
  ],
  imports: [CommonModule, MatIconModule],
  exports: [
    PdfViewComponent,
    PdfPreviewComponent,
    LogoComponent,
    CalenderComponent
  ]
})
export class CommonComponentsModule {}
