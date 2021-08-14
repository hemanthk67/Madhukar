import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { RoutingService } from "../../../services/routing.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-internal-nav-bar",
  templateUrl: "./internal-nav-bar.component.html",
  styleUrls: ["./internal-nav-bar.component.scss"],
})
export class InternalNavBarComponent implements OnInit {
  categories: any;
  constructor(
    public Auth: AuthService,
    private RoutingServices: RoutingService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    if (!this.Auth.userData) {
      this.Auth.user.subscribe((value) => this.Auth.login(value, true));
    }
    this.categories = this.RoutingServices.leftNavData;
    iconRegistry.addSvgIcon(
      "arrow",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/down-spiral.svg")
    );
  }

  ngOnInit() {}

  categoryrSelected(i) {
    this.categories[i].flag = !this.categories[i].flag;
    // this.RoutingServices.tender(this.flags.categorySelected[i]);
  }
  subCategoryrSelected(valuei, valuej) {
    this.RoutingServices.tender(
      this.categories[valuei].subcategories[valuej].path
    );
  }
}
