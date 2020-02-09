import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  public test: any;
  ordersService: any;
  coffeeOrders: any;
  uid: any;
  existingUser: any;
  constructor(
    public Auth: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      "poles",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/test.svg")
    );
    iconRegistry.addSvgIcon(
      "trans",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/trans_logo.svg")
    );
    this.Auth.user.subscribe(value => this.userExist(value));
  }

  ngOnInit() {
    console.log("test");
    this.Auth.getOrganizations().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log("error");
        console.log(err.message);
      }
    );
  }
  googleLogin() {
    this.Auth.googleLogin().then(function() {});
  }

  userExist(value: any) {
    if (value) {
      this.existingUser = value;
      this.router.navigate(["/Internal"]);
    }
  }
  existingLogin() {
    this.router.navigate(["/Internal"]);
  }
  otherUser() {
    this.existingUser = null;
  }
}
