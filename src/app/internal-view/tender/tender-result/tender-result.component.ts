import { Component, OnInit } from '@angular/core';
import { pdfFileService } from "src/app/services/pdfFile.service";


import { TenderService } from "../../../services/internal/tender/tender.service";
import { RoutingService } from 'src/app/services/routing.service';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
 

@Component({
  selector: 'app-tender-result',
  templateUrl: './tender-result.component.html',
  styleUrls: ['./tender-result.component.scss']
})
export class TenderResultComponent implements OnInit {

  constructor(   private pdf:pdfFileService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public tenderService: TenderService,
    private routingService: RoutingService) { }

  ngOnInit() {
    
    this.RightTab();
  }
  RightTab() {
    this.routingService.rightTabs = [{name:'Tender Results',
    message: 'Submission of the Tender Results',
  flag: true },
  {name:'Query',
    message: 'Enter the Queries and their Replies',
  flag: false }
  ];
  }
  backToTenderList () {
    
  }
}
