import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RoutingService {
  constructor(private router: Router) {}
  tender(path: any) {
    this.router.navigate([{ outlets: { approved: path } }]);
  }
}
