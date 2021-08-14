import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/internal/admin/admin.service";

@Component({
  selector: "app-login-permissions",
  templateUrl: "./login-permissions.component.html",
  styleUrls: ["./login-permissions.component.scss"],
})
export class LoginPermissionsComponent implements OnInit {
  changeIndex: any;
  submitFlag = false;
  changeUserData = [];
  constructor(public adminService: AdminService) {
    if (this.adminService.userData) {
      this.adminService.userData = this.adminService.userOriginalData;
    }
  }

  ngOnInit() {}

  permission(value, index) {
    if (value == "admin") {
      this.changeUserData[0].role.admin = !this.changeUserData[0].role.admin;
    } else if (value == "tender") {
      this.changeUserData[0].role.tender = !this.changeUserData[0].role.tender;
    } else if (value == "marketing") {
      this.changeUserData[0].role.marketing =
        !this.changeUserData[0].role.marketing;
    } else if (value == "production") {
      this.changeUserData[0].role.production =
        !this.changeUserData[0].role.production;
    } else if (value == "purchase") {
      this.changeUserData[0].role.purchase =
        !this.changeUserData[0].role.purchase;
    } else if (value == "finance") {
      this.changeUserData[0].role.finance =
        !this.changeUserData[0].role.finance;
    } else if (value == "operation") {
      this.changeUserData[0].role.operation =
        !this.changeUserData[0].role.operation;
    }
    if (
      JSON.stringify(this.changeUserData[0]) ===
      JSON.stringify(this.adminService.userData[this.changeIndex])
    ) {
      this.submitFlag = false;
    } else {
      this.submitFlag = true;
    }
  }
  subPermission(value, category, index) {
    if (category == "role") {
      if (value == "admin") {
        this.changeUserData[0].role.Admin.role =
          !this.changeUserData[0].role.Admin.role;
      } else if (value == "tender") {
        this.changeUserData[0].role.Tender.role =
          !this.changeUserData[0].role.Tender.role;
      } else if (value == "marketing") {
        this.changeUserData[0].role.Marketing.role =
          !this.changeUserData[0].role.Marketing.role;
      } else if (value == "production") {
        this.changeUserData[0].role.Production.role =
          !this.changeUserData[0].role.Production.role;
      } else if (value == "purchase") {
        this.changeUserData[0].role.Purchase.role =
          !this.changeUserData[0].role.Purchase.role;
      } else if (value == "finance") {
        this.changeUserData[0].role.Finance.role =
          !this.changeUserData[0].role.Finance.role;
      } else if (value == "operation") {
        this.changeUserData[0].role.Operation.role =
          !this.changeUserData[0].role.Operation.role;
      }
    } else if (category == "technical") {
      if (value == "admin") {
        this.changeUserData[0].role.Admin.technical =
          !this.changeUserData[0].role.Admin.technical;
      } else if (value == "tender") {
        this.changeUserData[0].role.Tender.technical =
          !this.changeUserData[0].role.Tender.technical;
      } else if (value == "marketing") {
        this.changeUserData[0].role.Marketing.technical =
          !this.changeUserData[0].role.Marketing.technical;
      } else if (value == "production") {
        this.changeUserData[0].role.Production.technical =
          !this.changeUserData[0].role.Production.technical;
      } else if (value == "purchase") {
        this.changeUserData[0].role.Purchase.technical =
          !this.changeUserData[0].role.Purchase.technical;
      } else if (value == "finance") {
        this.changeUserData[0].role.Finance.technical =
          !this.changeUserData[0].role.Finance.technical;
      } else if (value == "operation") {
        this.changeUserData[0].role.Operation.technical =
          !this.changeUserData[0].role.Operation.technical;
      }
    }
    if (
      JSON.stringify(this.changeUserData[0]) ===
      JSON.stringify(this.adminService.userData[this.changeIndex])
    ) {
      this.submitFlag = false;
    } else {
      this.submitFlag = true;
    }
  }
  addUser(index) {
    this.adminService.userData[0] =
      this.adminService.newUserData[
        this.adminService.newUserData.length - 1 - index
      ];
    this.adminService.approveUser({ ...this.adminService.userData[0] });
  }
  changePermission(index) {
    this.changeUserData[0] = JSON.parse(
      JSON.stringify(
        this.adminService.userData[
          this.adminService.userData.length - 1 - index
        ]
      )
    );
    this.changeIndex = this.adminService.userData.length - 1 - index;
    if (
      JSON.stringify(this.changeUserData[0]) ===
      JSON.stringify(this.adminService.userData[this.changeIndex])
    ) {
      this.submitFlag = false;
    } else {
      this.submitFlag = true;
    }
  }
  submitChanges() {
    this.adminService.updateUser(
      JSON.parse(JSON.stringify(this.changeUserData[0]))
    );
    this.changeUserData = [];
    this.submitFlag = false;
  }
}
