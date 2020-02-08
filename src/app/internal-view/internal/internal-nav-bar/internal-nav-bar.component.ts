import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-internal-nav-bar",
  templateUrl: "./internal-nav-bar.component.html",
  styleUrls: ["./internal-nav-bar.component.scss"]
})
export class InternalNavBarComponent implements OnInit {
  @Output() flag = new EventEmitter<boolean>();
  flags: any;
  constructor(private router: Router, private Auth: AuthService) {}

  ngOnInit() {
    this.flags = {
      mainBarTenderSelected: false,
      mainBarTenderFormSelected: false,
      mainBarFinanceSelected: false
    };
    this.flag.emit(this.flags);
  }

  mainBarTender() {
    this.Auth.testing(this.flags.mainBarTenderSelected);
    this.flags.mainBarTenderSelected = !this.flags.mainBarTenderSelected;
    this.flag.emit(this.flags);
  }
}
