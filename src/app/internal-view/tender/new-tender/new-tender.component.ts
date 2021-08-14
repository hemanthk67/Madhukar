import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { TenderService } from "../../../services/internal/tender/tender.service";

import { InfoService } from "../../../services/internal/info.service";
import { RoutingService } from "src/app/services/routing.service";

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
  styleUrls: ["./new-tender.component.scss"],
})
export class NewTenderComponent implements OnInit {
  testFile: FileList;
  allFiles: any;
  currentFile: Upload;
  editFileRemove: any;
  editFileAdd: any;
  newOrganizationName = {
    fullName: "",
    name: "",
  };
  addOrganizationFlag = {
    fullName: true,
    name: true,
  };
  calanderFlag = {
    issueDate: false,
    startDate: false,
    dueDate: false,
  };
  tender: any;
  flag = {
    organization: true,
    tenderNumber: true,
    eTenderNumber: true,
    issueDate: true,
    startDate: true,
    dueDate: true,
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
    { name: "", width: "40px" },
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
      special: false,
    },
  ];
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public tenderService: TenderService,
    public infoService: InfoService,
    public routingService: RoutingService
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
    this.RightTab();
    this.tender = this.tenderService.newTender;
    if (this.tenderService.editFlag) {
      this.items = this.tender.items;
      this.allFiles = this.tender.files.tenderDocuments.slice();
    }
  }
  RightTab() {
    this.routingService.rightTabs = [
      {
        name: "Add Organizaion",
        message: "Add New Organization to be used in the Tenders",
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
      this.tender.transactionFee.percentage =
        !this.tender.transactionFee.percentage;
    } else if (value == "documentCost") {
      this.tender.documentCost.percentage =
        !this.tender.documentCost.percentage;
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
      destination: this.items[this.items.length - 1].destination,
      distance: this.items[this.items.length - 1].distance,
      special: false,
    });
  }
  removeItems(value: any) {
    this.items.splice(value, 1);
  }
  specialItems(value: any) {
    this.items[value].special = !this.items[value].special;
  }

  detectFile(event) {
    this.testFile = event.target.files;
    console.log(this.testFile);
    if (this.allFiles) {
      for (let i = 0; i < this.testFile.length; i++) {
        this.allFiles[this.allFiles.length] = this.testFile[i];
        if (this.tenderService.editFlag) {
          if (this.editFileAdd) {
            this.editFileAdd[this.editFileAdd.length] = this.testFile[i];
          } else {
            this.editFileAdd = [];
            this.editFileAdd.push(this.testFile[i]);
          }
        }
      }
    } else {
      this.allFiles = Array.from(this.testFile);
      if (this.tenderService.editFlag) {
        if (this.editFileAdd) {
          for (let i = 0; i < this.testFile.length; i++) {
            this.editFileAdd[this.editFileAdd.length] = this.testFile[i];
          }
        } else {
          this.editFileAdd = Array.from(this.testFile);
        }
      }
    }
  }
  deleteFile(value: any) {
    var editFile = true;
    if (this.tenderService.editFlag) {
      if (this.editFileAdd) {
        for (let i = 0; i < this.editFileAdd.length; i++) {
          if (this.editFileAdd[i].name == this.allFiles[value].name) {
            this.editFileAdd.splice(i, 1);
            editFile = false;
          }
        }
      }
      if (editFile) {
        this.editFileRemove = this.allFiles[value];
      } else {
        this.allFiles.splice(value, 1);
      }
    } else {
      this.allFiles.splice(value, 1);
    }
  }

  submit() {
    if (this.tender.organization == "") {
      this.flag.organization = false;
    } else {
      this.flag.organization = true;
    }
    if (this.tender.tenderNumber == "") {
      this.flag.tenderNumber = false;
    } else {
      this.flag.tenderNumber = true;
    }
    if (this.tender.eTenderNumber == "") {
      this.flag.eTenderNumber = false;
    } else {
      this.flag.eTenderNumber = true;
    }
    if (this.tender.issueDate == "") {
      this.flag.issueDate = false;
    } else {
      this.flag.issueDate = true;
    }
    if (this.tender.startDate == "") {
      this.flag.startDate = false;
    } else {
      this.flag.startDate = true;
    }
    if (this.tender.dueDate == "") {
      this.flag.dueDate = false;
    } else {
      this.flag.dueDate = true;
    }
    this.tender.items = this.items;
    if (
      this.flag.organization &&
      this.flag.tenderNumber &&
      this.flag.eTenderNumber &&
      this.flag.issueDate &&
      this.flag.startDate &&
      this.flag.dueDate
    ) {
      if (this.tenderService.editFlag) {
        this.tenderService.pushTenderData(this.tender, this.editFileAdd);
        // this.tenderService.removeFiles(this.editFileRemove);
      } else {
        this.tenderService.pushTenderData(this.tender, this.allFiles);
      }
      this.routingService.tenderList();
    }
  }

  displayCounter(value) {
    if (value) {
      if (this.calanderFlag.issueDate) {
        this.tender.issueDate = value;
        this.calanderFlag.issueDate = false;
      } else if (this.calanderFlag.startDate) {
        this.tender.startDate = value;
        this.calanderFlag.startDate = false;
      } else if (this.calanderFlag.dueDate) {
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
    if (value == "dueDate") {
      this.calanderFlag.dueDate = !this.calanderFlag.dueDate;
      this.calanderFlag.startDate = false;
      this.calanderFlag.issueDate = false;
    } else if (value == "startDate") {
      this.calanderFlag.dueDate = false;
      this.calanderFlag.startDate = !this.calanderFlag.startDate;
      this.calanderFlag.issueDate = false;
    } else if (value == "issueDate") {
      this.calanderFlag.dueDate = false;
      this.calanderFlag.startDate = false;
      this.calanderFlag.issueDate = !this.calanderFlag.issueDate;
    }
  }

  addOrganizationBack() {
    this.routingService.rightTabs[0].flag =
      !this.routingService.rightTabs[0].flag;
  }
  addOrganization() {
    if (this.newOrganizationName.fullName != "") {
      if (this.newOrganizationName.name != "") {
        this.infoService.addOrganizationName(this.newOrganizationName);
        this.newOrganizationName.fullName = "";
        this.newOrganizationName.name = "";
        this.routingService.rightTabs[0].flag =
          !this.routingService.rightTabs[0].flag;
      } else {
        this.addOrganizationFlag.name = false;
      }
    } else {
      this.addOrganizationFlag.fullName = false;
    }
  }
}
