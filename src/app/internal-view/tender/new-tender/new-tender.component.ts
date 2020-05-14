import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { TenderService } from "../../../services/internal/tender/tender.service";

import { InfoService } from "../../../services/internal/info.service";

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
  selector: "app-new-tender",
  templateUrl: "./new-tender.component.html",
  styleUrls: ["./new-tender.component.scss"]
})
export class NewTenderComponent implements OnInit {
  testFile: FileList;
  allFiles: any;
  currentFile: Upload;
  calanderFlag = {
    issueDate: false,
    startDate: false,
    dueDate: false
  };
 tender:any;
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
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public tenderService: TenderService,
    public infoService:InfoService
  ) {
    iconRegistry.addSvgIcon(
      "calander",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
    );
    iconRegistry.addSvgIcon(
      "trash",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/trash-icon.svg")
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
    this.tender = this.tenderService.tender;
  }
  tenderModeSelection(value: any) {
    this.tender.tenderMode = value;
  }
  feeExcemption(value: any, key: boolean) {
    if (value == "emd") {
      this.tender.emd.exemption = key;
    } else if (value == "transactionFee") {
      this.tender.transactionFee.exemption = key;
    } else if (value == "documentCost") {
      this.tender.documentCost.exemption = key;
    }
  }
  percentageChange(value: any) {
    if (value == "emd") {
      this.tender.emd.percentage = !this.tender.emd.percentage;
    } else if (value == "transactionFee") {
      this.tender.transactionFee.percentage = !this.tender.transactionFee
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

  detectFile(event) {
    this.testFile = event.target.files;
    if (this.allFiles) {
      for (let i = 0; i < this.testFile.length; i++) {
        this.allFiles[this.allFiles.length] = this.testFile[i];
      }
    } else {
      this.allFiles = Array.from(this.testFile);
    }
  }

  deleteFile(value: any) {
    this.allFiles.splice(value, 1);
  }
//   public uploadFile() {
//     if(this.allFiles) {
//     for (let i = 0; i < this.allFiles.length; i++) {
//       let file = this.allFiles[i];
//       this.currentFile = new Upload(file);
// this.tender.files[i].name = file.name;
// this.tender.files[i].path = 'tender/' + file.name
//       // this.pdfService.pushUpload(this.currentFile);
//     }
//   }
//     console.log(this.tender);
//     console.log(this.allFiles)
//   }

  submit() {
    this.tender.items = this.items;
    this.tenderService.pushTenderData(this.tender,this.allFiles);
  }

  displayCounter(value) {
    if(value) {
if(this.calanderFlag.issueDate) {
this.tender.issueDate = value;
this.calanderFlag.issueDate = false;
} else if(this.calanderFlag.startDate) {
  this.tender.startDate = value;
  this.calanderFlag.startDate = false;
} else if(this.calanderFlag.dueDate) {
  this.tender.dueDate = value;
  this.calanderFlag.dueDate = false;
}
    } else {
      this.calanderFlag.dueDate = false;
      this.calanderFlag.startDate = false;
this.calanderFlag.issueDate = false;
    }
  }
  calanderOpen(value) {
    if(value == 'dueDate') {
    this.calanderFlag.dueDate = !this.calanderFlag.dueDate;
    this.calanderFlag.startDate = false;
    this.calanderFlag.issueDate = false;
  } else if(value == 'startDate') {
    this.calanderFlag.dueDate = false;
    this.calanderFlag.startDate = !this.calanderFlag.startDate;
    this.calanderFlag.issueDate = false;
      } else if(value == 'issueDate') {
        this.calanderFlag.dueDate = false;
        this.calanderFlag.startDate = false;
        this.calanderFlag.issueDate = !this.calanderFlag.issueDate;
            } 
  }
}
