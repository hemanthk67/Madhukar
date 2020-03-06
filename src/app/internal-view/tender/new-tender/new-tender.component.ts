import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-new-tender",
  templateUrl: "./new-tender.component.html",
  styleUrls: ["./new-tender.component.scss"]
})
export class NewTenderComponent implements OnInit {
  tender = {
    organization: "",
    tenderMode: "online",
    tenderNumber: "",
    eTenderNumber: "",
    issueDate: "",
    startDate: "",
    dueDate: "",
    emd: {
      exemption: true,
      percentage: true,
      amount: "12"
    },
    transationFee: {
      exemption: true,
      percentage: true,
      amount: "122"
    },
    documentCost: {
      exemption: true,
      percentage: true,
      amount: "123"
    },
    items: []
  };
  tableHeaderTest = [
    { name: "Discription", width: "180px" },
    { name: "KVA", width: "70px" },
    { name: "Class", width: "140px" },
    { name: "Type", width: "100px" },
    { name: "Qty", width: "80px" },
    { name: "Standard", width: "100px" },
    { name: "Destination", width: "100px" },
    { name: "Distance", width: "130px" },
    { name: "", width: "40px" },
    { name: "", width: "40px" }
  ];
  items = [
    {
      discription: "",
      kva: "",
      class: { hv: "", lv: "" },
      type: "",
      qty: "",
      standard: "",
      destination: "",
      distance: "",
      special: false
    }
  ];
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "calander",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
    );
    iconRegistry.addSvgIcon(
      "trash",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/trash-icon.svg")
    );
  }

  ngOnInit() {}
  tenderModeSelection(value: any) {
    this.tender.tenderMode = value;
  }
  feeExcemption(value: any, key: boolean) {
    if (value == "emd") {
      this.tender.emd.exemption = key;
    } else if (value == "transationFee") {
      this.tender.transationFee.exemption = key;
    } else if (value == "documentCost") {
      this.tender.documentCost.exemption = key;
    }
  }
  percentageChange(value: any) {
    if (value == "emd") {
      this.tender.emd.percentage = !this.tender.emd.percentage;
    } else if (value == "transationFee") {
      this.tender.transationFee.percentage = !this.tender.transationFee
        .percentage;
    } else if (value == "documentCost") {
      this.tender.documentCost.percentage = !this.tender.documentCost
        .percentage;
    }
  }

  addItems() {
    this.items.push({
      discription: "",
      kva: "",
      class: { hv: "", lv: "" },
      type: "",
      qty: "",
      standard: "",
      destination: "",
      distance: "",
      special: false
    });
  }
  removeItems(value: any) {
    this.items.splice(value, 1);
    // this.tender.items = this.items;
    // console.log(this.tender);
  }
  specialItems(value: any) {
    this.items[value].special = !this.items[value].special;
  }
}
