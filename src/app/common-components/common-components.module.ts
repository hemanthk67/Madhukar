import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PdfViewComponent } from "./internal/pdf-view/pdf-view.component";

@NgModule({
  declarations: [PdfViewComponent],
  imports: [CommonModule],
  exports: [PdfViewComponent]
})
export class CommonComponentsModule {}
