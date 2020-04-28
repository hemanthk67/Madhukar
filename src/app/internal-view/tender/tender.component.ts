import { Component, OnInit } from "@angular/core";
import { CommonComponentsModule } from "src/app/common-components/common-components.module";

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { TenderService } from "../../services/internal/tender/tender.service";
import { pdfFileService } from "src/app/services/pdfFile.service";

@Component({
  selector: "app-tender",
  templateUrl: "./tender.component.html",
  styleUrls: ["./tender.component.scss"]
})
export class TenderComponent implements OnInit {
  tenders: any[];
  constructor(
    private pdf:pdfFileService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public tenderService: TenderService) {
      iconRegistry.addSvgIcon(
        "down-spiral",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/down-spiral.svg")
        );
        iconRegistry.addSvgIcon(
          "pdf-icon",
          sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pdf-icon.svg")
        );
  }

  ngOnInit() {}
  read(index) {
    this.tenderService.data[this.tenderService.data.length - 1 - index].flag = !this.tenderService.data[this.tenderService.data.length - 1 - index].flag;
    for(let i = 0 ; i < this.tenderService.data.length; i++) {
      if( (this.tenderService.data.length - 1 - index) != i ) {
      this.tenderService.data[i].flag = true;
      }
    }
  }
  downloadFile(path) {
    alert(path);
    this.pdf.downloadPdf(path);
  }
  approval(value, index) {
   this.tenderService.originalData[this.tenderService.originalData.length - index - 1].status = value;
   this.tenderService.setTenderData(this.tenderService.originalData[this.tenderService.originalData.length - index - 1]);
   this.tenderService.data[this.tenderService.originalData.length - index - 1].status = value;
  }
}
