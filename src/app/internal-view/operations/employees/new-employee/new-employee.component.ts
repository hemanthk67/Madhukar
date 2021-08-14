import { Component, OnInit } from "@angular/core";
import { OperationsService } from "src/app/services/internal/operations/operations.service";

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

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
  selector: "app-new-employee",
  templateUrl: "./new-employee.component.html",
  styleUrls: ["./new-employee.component.scss"],
})
export class NewEmployeeComponent implements OnInit {
  employee = {
    number: "",
    active: false,
    type: "Employee",
    name: "",
    gender: "Male",
    bloodGroup: "O(+ve)",
    dob: "",
    phoneNumber: "",
    email: "",
    proofNumber: "",
    proofPath: "",
    photoPath: "",
    qualification: "",
    experiance: "",
    reference: [
      {
        name: "",
        phoneNumber: "",
        relation: "",
      },
      {
        name: "",
        phoneNumber: "",
        relation: "",
      },
    ],
    department: "Marketing",
    designation: "",
    salary: {
      monthlySalary: 0,
      monthlyFixedBonus: 0,
    },
    bank: {
      name: "",
      branch: "",
      accountNumber: "",
      ifsc: "",
    },
  };
  photoFile: any;
  proofFile: any;
  resumeFile: any;
  calanderFlag = false;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private operations: OperationsService
  ) {
    iconRegistry.addSvgIcon(
      "calander",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
    );
  }

  ngOnInit() {}

  submit() {
    this.employee.number = this.employee.type.slice(0, 1);
    this.employee.number =
      this.employee.number + this.employee.department.slice(0, 1);
    this.operations.newEmployee(
      JSON.parse(JSON.stringify(this.employee)),
      this.photoFile[0],
      this.proofFile[0],
      this.resumeFile[0]
    );
    this.employee.number = "";
  }

  detectPhotoFile(event) {
    this.photoFile = event.target.files;
  }
  detectProofFile(event) {
    this.proofFile = event.target.files;
  }
  detectResumeFile(event) {
    this.resumeFile = event.target.files;
  }
  displayCounter(value) {
    this.employee.dob = value;
    this.calanderFlag = false;
  }
  calanderOpen() {
    this.calanderFlag = !this.calanderFlag;
  }
}
