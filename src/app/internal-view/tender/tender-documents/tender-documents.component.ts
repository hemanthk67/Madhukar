import { Component, OnInit, Output } from "@angular/core";


import { TenderService } from "../../../services/internal/tender/tender.service";
import { RoutingService } from 'src/app/services/routing.service';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}
@Component({
  selector: "app-tender-documents",
  templateUrl: "./tender-documents.component.html",
  styleUrls: ["./tender-documents.component.scss"]
})
export class TenderDocumentsComponent implements OnInit {
  @Output() testing: any;
  tabs = [{name:'Upload'},
  {name:'Create Documents',
   sub:['Covering Letter', 'No-Ban Declaration'],
   Flag: false
  },
   {name:'Complete Tender'}];
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public tenderService: TenderService,
    public routingService: RoutingService) {
      iconRegistry.addSvgIcon(
        "down-spiral",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/down-spiral.svg")
        );
        iconRegistry.addSvgIcon(
          "pdf-icon",
          sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pdf-icon.svg")
        );
        iconRegistry.addSvgIcon(
          "cloud-cross-icon",
          sanitizer.bypassSecurityTrustResourceUrl(
            "assets/icons/cloud-cross-icon.svg"
          )
        );
  }

  ngOnInit() {
    this.RightTab();
    setTimeout(
        function() {
          this.routingService.loadingFlag = false;
        }.bind(this),
        200
      );
  }
RightTab() {
  this.routingService.rightTabs = [{name:'Upload',
  message: 'Upload and Attatch all documents required for the Tender',
flag: true },
   {name:'Complete Tender',
   message: 'Upload and Attatch all documents required for the Tender',
   flag: false }
  //  ,{name:'Create Documents',
  //  sub:[
  //    {name:'Covering Letter', smallName:'CL',
  //    flag: false},
  //  {name:'No-Ban Declaration', smallName:'NBD',
  //  flag: false},
  //  {name:'No Deviation', smallName:'ND',
  //  flag: false} ],
  //  flag: false,
  //  message: 'Create documents in given formates' 
  // }
];
}
  //start of needed funtion
  backToTenderList() {
this.routingService.tenderList();
  }
}
