import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  HostListener,
} from "@angular/core";
import * as d3 from "d3";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { pdfFileService } from "src/app/services/pdfFile.service";
import { RoutingService } from "src/app/services/routing.service";

@Component({
  selector: "app-pdf-preview",
  templateUrl: "./pdf-preview.component.html",
  styleUrls: ["./pdf-preview.component.scss"],
})
export class PdfPreviewComponent implements OnInit {
  @Output() confirm = new EventEmitter<boolean>();
  @Output() backFlag = new EventEmitter<boolean>();
  @Input() documentName;
  @Input() type;
  @Input() firm;
  savepdf: File;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private routingService: RoutingService,
    private pdfService: pdfFileService
  ) {
    iconRegistry.addSvgIcon(
      "back-button",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/back-button.svg")
    );
  }

  ngOnInit() {
    d3.select("html").style("overflow", "hidden");
    // d3.select(".pdf-container-div").style("display", "none");  the height checking is not working in the tenderdcuments page
    if (this.firm === "THOTA COLDCEL PVT LTD") {
      d3.select("#pdf-preview")
        .append("img")
        .attr("id", "pdf-preview-header")
        .attr("src", "./assets/pdf/" + this.type + "header.jpg")
        .style("padding-top", "10px")
        .style("width", "100%");
    } else {
      d3.select("#pdf-preview")
        .append("img")
        .attr("id", "pdf-preview-header")
        .attr("src", "./assets/pdf/" + this.type + "header.jpg")
        .style("padding-top", "10px")
        .style("width", "100%");
    }
    if (this.type == "coldcel" || this.type == "thota") {
      d3.select("#pdf-preview")
        .style("position", "relative")
        .append("img")
        .attr("src", "./assets/logo/" + "Inspected.jpg")
        .style("width", "75%")
        .style("position", "absolute")
        .style("bottom", "5px")
        .style("left", "106px");
    }

    // second page
    d3.select("#pdf-preview-1")
      .append("img")
      .attr("src", "./assets/pdf/" + this.type + "header.jpg")
      .style("padding-top", "10px")
      .style("width", "100%");
    if (this.type == "coldcel") {
      d3.select("#pdf-preview-1")
        .style("position", "relative")
        .append("img")
        .attr("src", "./assets/pdf/" + "coldcel" + "footer.jpg")
        .style("width", "100%")
        .style("position", "absolute")
        .style("bottom", "0")
        .style("left", "0");
    }
    // setTimeout(
    //   function() {
    //     d3.select(".pdf-container-div").style("display", "unset");
    //     if (this.pdfPreviewPage1.node().getBoundingClientRect().height < 800) {
    //       // d3.select("#pdf-preview-1").style("display", "none");
    //     }
    //   }.bind(this),
    //   2000
    // );
  }
  OnDestroy() {
    // d3.select("html").style("overflow-y", "scroll");
  }
  pdf() {
    var test = document.getElementById("pdf-preview");
    var pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    html2canvas(test, { scale: 2, logging: true }).then((canvas) => {
      var imgWidth = 212;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heigtLeft = imgHeight;
      const contentDataURL = canvas.toDataURL("image/png");
      var position = 0;
      pdf.addImage(
        contentDataURL,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      test = document.getElementById("pdf-preview-1");
      html2canvas(test, { scale: 2, logging: true }).then((canvas) => {
        var imgWidth = 212;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heigtLeft = imgHeight;
        const contentDataURL = canvas.toDataURL("image/png");
        var position = 0;
        pdf.addPage();
        pdf.addImage(
          contentDataURL,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        pdf.save(this.documentName + ".pdf");
        this.confirm.emit(true);
        // this.savepdf = pdf.output("blob");
        // console.log(this.savepdf);
        // this.pdfService.savePdf(this.savepdf);
        this.routingService.enquiryList();
      });
    });
  }
  @HostListener("window:keyup", ["$event"]) keyup(e) {
    if (e.which == 27) {
      this.approvedForSignature();
      // this.back();
    }
  }
  back() {
    this.backFlag.emit(true);
  }
  approvedForSignature() {
    d3.select("#pdf-preview")
      .append("img")
      .attr("src", "./assets/signatures/sign.png")
      .style("position", "absolute")
      .style("bottom", "90px")
      .style("right", "60px")
      .style("width", "150px")
      .style("height", "150px");

    d3.select("#pdf-preview-1")
      .append("img")
      .attr("src", "./assets/signatures/sign.png")
      .style("position", "absolute")
      .style("bottom", "90px")
      .style("right", "60px")
      .style("width", "150px")
      .style("height", "150px");
  }
}
