import { Component, OnInit } from "@angular/core";
import { OperationsService } from "src/app/services/internal/operations/operations.service";
import { RoutingService } from "src/app/services/routing.service";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  constructor(
    public routingService: RoutingService,
    public operationsService: OperationsService
  ) {}

  ngOnInit() {
    this.RightTab();
  }

  RightTab() {
    this.routingService.rightTabs = [
      {
        name: "Attandance",
        message: "Add Attandance for Employee/Worker for salaries",
        flag: true,
      },
      {
        name: "Add Employee",
        message: "Add New Employee/Worker to our data for future use",
        flag: false,
      },
      {
        name: "Employee and Worker List",
        message: "Navigate to Employee and Worker List",
        flag: false,
      },
      {
        name: "Salary Statement",
        message: "Navigate to Employee and Worker List",
        flag: false,
      },
    ];
  }
}
