import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { pdfFileService } from 'src/app/services/pdfFile.service';

import { PoReceivedService } from 'src/app/services/po-received.service';

@Component({
  selector: 'app-po-review',
  templateUrl: './po-review.component.html',
  styleUrls: ['./po-review.component.scss']
})
export class PoReviewComponent implements OnInit {

  pos: any;  
  poFlag = false;
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,public poReceivedService: PoReceivedService,
    private pdf:pdfFileService) {
    this.poReceivedService.getPOs();
    iconRegistry.addSvgIcon(
      "down-spiral",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/down-spiral.svg")
      );
      iconRegistry.addSvgIcon(
        "pdf-icon",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pdf-icon.svg")
      );
      iconRegistry.addSvgIcon(
        "edit-icon",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/edit-icon.svg")
      );
   }

  ngOnInit() {
  }
  read(index) {
    this.poReceivedService.pos[this.poReceivedService.pos.length - 1 - index].flag = !this.poReceivedService.pos[this.poReceivedService.pos.length - 1 - index].flag;
    for(let i = 0 ; i < this.poReceivedService.pos.length; i++) {
      if( (this.poReceivedService.pos.length - 1 - index) != i ) {
      this.poReceivedService.pos[i].flag = true;
      }
    }
  }
  downloadFile(path) {
    this.pdf.downloadPdf(path);
  }
  approval(value, index) {
    this.poReceivedService.originalPos[this.poReceivedService.originalPos.length - index - 1].status = value;
    this.poReceivedService.setPoData(this.poReceivedService.originalPos[this.poReceivedService.originalPos.length - index - 1]);
    this.poReceivedService.pos[this.poReceivedService.originalPos.length - index - 1].status = value;
   }

  edit(index) {
    this.poReceivedService.po = this.poReceivedService.originalPos[this.poReceivedService.originalPos.length - index - 1]; 
    // this.poReceivedService.editFlag = true;    
this.poFlag = !this.poFlag;
    // this.routingService.newTender();
  }
  poReturnData(value) {
    console.log(value);
//     this.marketingService.enquiry.poNumber = value.poNumber;
//     this.marketingService.enquiry.poInternalNumber = value.number; 
this.poFlag = !this.poFlag;
// this.marketingService.enquiryResultSubmission(this.marketingService.enquiry);
  }

}
