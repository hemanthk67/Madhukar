import { Component, OnInit } from "@angular/core";

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { RoutingService } from "src/app/services/routing.service";

@Component({
  selector: "app-internal-right-nav-bar",
  templateUrl: "./internal-right-nav-bar.component.html",
  styleUrls: ["./internal-right-nav-bar.component.scss"],
})
export class InternalRightNavBarComponent implements OnInit {
  constructor(
    public routingService: RoutingService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "right-arrow",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/right-arrow.svg")
    );
  }

  ngOnInit() {}
  //tabs function
  tabSwitch(index, subIndex) {
    if (this.routingService.rightTabs[index].sub) {
      if (this.routingService.rightTabs[index].flag) {
        this.setFlag(index, subIndex, true);
      } else {
        this.routingService.rightTabs[index].flag =
          !this.routingService.rightTabs[index].flag;
      }
      this.resetFlag(index);
    } else {
      this.setFlag(index, subIndex, false);
    }
  }
  resetFlag(index) {
    setTimeout(
      function () {
        this.routingService.rightTabs[index].flag =
          !this.routingService.rightTabs[index].flag;
      }.bind(this),
      6000
    );
  }
  setFlag(index, subIndex, subFlag) {
    for (let k = 0; k < this.routingService.rightTabs.length; k++) {
      this.routingService.rightTabs[k].flag = false;
      if (this.routingService.rightTabs[k].sub) {
        for (let l = 0; l < this.routingService.rightTabs[k].sub.length; l++) {
          this.routingService.rightTabs[k].sub[l].flag = false;
        }
      }
    }
    if (subFlag) {
      this.routingService.rightTabs[index].sub[subIndex].flag = true;
    } else {
      this.routingService.rightTabs[index].flag = true;
    }
  }
}
