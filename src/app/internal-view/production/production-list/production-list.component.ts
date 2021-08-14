import { Component, OnInit } from "@angular/core";

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { ProductionService } from "src/app/services/internal/production/production.service";
import { RoutingService } from "src/app/services/routing.service";

@Component({
  selector: "app-production-list",
  templateUrl: "./production-list.component.html",
  styleUrls: ["./production-list.component.scss"],
})
export class ProductionListComponent implements OnInit {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private productionService: ProductionService,
    public routingService: RoutingService
  ) {
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
    this.productionService.getProductionWorkOrders();
  }

  ngOnInit() {
    this.RightTab();
    setTimeout(
      function () {
        this.routingService.loadingFlag = false;
      }.bind(this),
      200
    );
  }

  RightTab() {
    this.routingService.rightTabs = [
      {
        name: "Production List",
        message: "View production list",
        flag: true,
      },
      {
        name: "Testing",
        message: "Create and update testing values",
        flag: false,
      },
      {
        name: "Dispatch",
        message: "Dispatch instructions and related documents",
        flag: false,
      },
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

  read(index) {
    this.productionService.workOrdersData[index].flag =
      !this.productionService.workOrdersData[index].flag;
    for (let i = 0; i < this.productionService.workOrdersData.length; i++) {
      if (index != i) {
        this.productionService.workOrdersData[i].flag = true;
      }
    }
  }
}
