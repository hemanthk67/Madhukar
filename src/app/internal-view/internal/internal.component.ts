import { Component, OnInit } from "@angular/core";
import { InfoService } from "../../services/internal/info.service";

@Component({
  selector: "app-internal",
  templateUrl: "./internal.component.html",
  styleUrls: ["./internal.component.scss"]
})
export class InternalComponent implements OnInit {
  constructor(public infoService:InfoService) {}

  ngOnInit() {
    document.getElementById('internal-active').style.display = 'inherit';
  }
}
