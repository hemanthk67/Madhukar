import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { RoutingService } from "../../../services/routing.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-internal-nav-bar",
  templateUrl: "./internal-nav-bar.component.html",
  styleUrls: ["./internal-nav-bar.component.scss"]
})
export class InternalNavBarComponent implements OnInit {
  flags = {
    categorySelected: [
      { flag: false, subcategories: [false, false] },
      { flag: false, subcategories: [false, false] },
      { flag: false, subcategories: [false, false] }
    ]
  };
  superCategories = [
    {
      title: "Tender",
      role: "admin",
      subcategories: [
        {
          title: "Tender List",
          path: "Tender"
        },
        {
          title: "New Tender Form",
          path: "Tender/NewTender"
        },
        {
          title: "Tender Documents",
          path: "Tender/TenderDocuments"
        }
      ]
    },
    {
      title: "Purchase",
      role: "purchase",
      subcategories: [
        {
          title: "Raise P.O",
          path: "Production/Po"
        }
      ]
    },
    {
      title: "Production",
      role: "production",
      subcategories: [
        {
          title: "Raise P.O",
          path: "Production/Po"
        }
      ]
    }
  ];
  categories: any;
  constructor(
    public Auth: AuthService,
    private RoutingServices: RoutingService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.categories = this.superCategories;
    for (let i = 0; i < this.categories.length; i++) {
      this.flags.categorySelected[i].flag = false;
      for (let j = 0; j < this.categories[i].subcategories.length; j++) {
        this.flags.categorySelected[i].subcategories[j] = false;
      }
    }
    iconRegistry.addSvgIcon(
      "arrow",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/down-arrow.svg")
    );
    // iconRegistry.addSvgIcon(
    //   "trans",
    //   sanitizer.bypassSecurityTrustResourceUrl("assets/icons/trans_logo.svg")
    // );
  }

  ngOnInit() {}

  categoryrSelected(i) {
    console.log(i);
    this.flags.categorySelected[i].flag = !this.flags.categorySelected[i].flag;
    // this.RoutingServices.tender(this.flags.categorySelected[i]);
  }
  subCategoryrSelected(valuei, valuej) {
    for (let i = 0; i < this.flags.categorySelected.length; i++) {
      if (i === valuei) {
        this.flags.categorySelected[i].flag = true;
      } else {
        this.flags.categorySelected[i].flag = false;
      }
      for (
        let j = 0;
        j < this.flags.categorySelected[i].subcategories.length;
        j++
      ) {
        if (i == valuei && j == valuej) {
          console.log;
          this.flags.categorySelected[i].subcategories[j] = true;
        } else {
          this.flags.categorySelected[i].subcategories[j] = false;
        }
      }
    }
    this.RoutingServices.tender(
      this.categories[valuei].subcategories[valuej].path
    );
  }
}
