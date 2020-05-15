import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-internal-right-nav-bar',
  templateUrl: './internal-right-nav-bar.component.html',
  styleUrls: ['./internal-right-nav-bar.component.scss']
})
export class InternalRightNavBarComponent implements OnInit {

  constructor(public authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        "right-arrow",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/right-arrow.svg")
      );
     }

  ngOnInit() {
  }
   //tabs function
   tabSwitch(index) {
    if(this.authService.rightTabs[index].sub) {
      this.authService.rightTabs[index].Flag = !this.authService.rightTabs[index].Flag;
      setTimeout(
        function() {
          this.authService.rightTabs[index].Flag = !this.authService.rightTabs[index].Flag;
        }.bind(this),
        6000
      );
    }

       }
}
