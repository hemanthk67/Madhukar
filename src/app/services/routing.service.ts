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
  tenderUploadDocuments() {
    this.router.navigate([
      { outlets: { primary: "Internal", approved: "Tender/TenderDocuments" } }
    ]);
  }
  tenderList() {
    this.router.navigate([
      { outlets: { primary: "Internal", approved: "Tender" } }
    ]);
  }
}
