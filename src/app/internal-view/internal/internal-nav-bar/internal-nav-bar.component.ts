import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { RoutingService } from "../../../services/routing.service";

@Component({
  selector: "app-internal-nav-bar",
  templateUrl: "./internal-nav-bar.component.html",
  styleUrls: ["./internal-nav-bar.component.scss"]
})
export class InternalNavBarComponent implements OnInit {
  flags = {
    categorySelected: [
      { flag: false, subcategories: [false, false] },
      { flag: false, subcategories: [false, false] }
    ]
  };
  categories = [
    {
      title: "Tender",
      role: "admin",
      subcategories: [
        {
          title: "Tenders",
          path: "Tender"
        },
        {
          title: "New Tender",
          path: "Tender/NewTender"
        }
      ]
    }
  ];
  constructor(private RoutingServices: RoutingService) {
    for (let i = 0; i < this.categories.length; i++) {
      this.flags.categorySelected[i].flag = false;
      for (let j = 0; j < this.categories[i].subcategories.length; j++) {
        this.flags.categorySelected[i].subcategories[j] = false;
      }
    }
  }

  ngOnInit() {}

  categoryrSelected(i) {
    console.log(i);
    this.flags.categorySelected[i].flag = !this.flags.categorySelected[i].flag;
    // this.RoutingServices.tender(this.flags.categorySelected[i]);
  }
  subCategoryrSelected(valuei, valuej) {
    for (let i = 0; i < this.flags.categorySelected.length; i++) {
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
