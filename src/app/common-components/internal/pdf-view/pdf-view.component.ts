import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3";
@Component({
  selector: "app-pdf-view",
  templateUrl: "./pdf-view.component.html",
  styleUrls: ["./pdf-view.component.scss"],
})
export class PdfViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    d3.select("#pdf-view")
      .append("img")
      .attr("src", "./assets/pdf/tccheader.jpg")
      // .style("height", "85px")
      .style("width", "100%");
    d3.select("#pdf-view")
      .style("position", "relative")
      .append("img")
      .attr("src", "./assets/pdf/tccfooter.jpg")
      // .style("height", "85px")
      .style("width", "100%")
      .style("position", "absolute")
      .style("bottom", "0")
      .style("left", "0");

    // this.pdfView.style("color", "white");
  }
}
