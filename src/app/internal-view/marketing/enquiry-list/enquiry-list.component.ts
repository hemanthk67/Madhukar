import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MarketingService } from 'src/app/services/internal/marketing/marketing.service';
import { RoutingService } from 'src/app/services/routing.service';
import { InfoService } from 'src/app/services/internal/info.service';
import { pdfFileService } from 'src/app/services/pdfFile.service';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {

  constructor( private pdf:pdfFileService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public marketingService: MarketingService,
    private routingService: RoutingService,
    public infoService:InfoService) {
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
    this.marketingService.data[this.marketingService.data.length - 1 - index].flag = !this.marketingService.data[this.marketingService.data.length - 1 - index].flag;
    for(let i = 0 ; i < this.marketingService.data.length; i++) {
      if( (this.marketingService.data.length - 1 - index) != i ) {
      this.marketingService.data[i].flag = true;
      }
    }
  }
  downloadFile(path) {
    this.pdf.downloadPdf(path);
  }
  approval(value, index) {
   this.marketingService.originalData[this.marketingService.originalData.length - index - 1].status = value;
   this.marketingService.setEnquiryData(this.marketingService.originalData[this.marketingService.originalData.length - index - 1]);
   this.marketingService.data[this.marketingService.originalData.length - index - 1].status = value;
  }
  prepareOffer(index) {
    this.marketingService.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - index - 1]; 
    // this.routingService.prepareOffer();
  }
  enquiryResults(index) {
    this.marketingService.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - index - 1]; 
    // this.routingService.enquiryResults();
  }
  edit(index) {
    this.marketingService.newEnquiry = this.marketingService.originalData[this.marketingService.originalData.length - index - 1]; 
    this.marketingService.editFlag = true;
    this.routingService.newEnquiry();
  }
}
