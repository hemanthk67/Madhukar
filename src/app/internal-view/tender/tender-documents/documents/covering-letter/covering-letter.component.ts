import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { style, selectAll } from "d3";

import * as jsonData from "../../tender-document.json";

@Component({
  selector: 'app-covering-letter',
  templateUrl: './covering-letter.component.html',
  styleUrls: ['./covering-letter.component.scss']
})
export class CoveringLetterComponent implements OnInit {
  
  JsonData: any = (jsonData as any).default;
  pdfPreviewPage1: any;
  pdfPreviewPage2;
  pdfPreviewFlag: any;
  coveringLetter: any;
  constructor() { 
    d3.select("input").on(
      "mouseover",
      function() {
        console.log("test");
      }.bind(this)
    );
  }

  ngOnInit() {
       this.coveringLetterInit();
    this.pdfPreviewFlag = true; // for the pdfPreview
  }
  coveringLetterInit() {
    this.coveringLetter = this.JsonData[0].coveringLetter;
    d3.select("#pdf-preview")
      .selectAll("*")
      .remove();
    setTimeout(
      function() {
        this.pdfForPreview();
      }.bind(this),
      1000
    );
  }
  pdfForPreview() {
    this.pdfForPreviewCoveringLetterPage1();
  }

  // covering letter starting
  pdfForPreviewCoveringLetterPage1() {
    var toAddress = this.pdfForPreviewFormate();
    d3.select("#pdf-preview").style("font-size", "13px");
    this.pdfPreviewPage1 = d3
      .select("#pdf-preview")
      .append("div")
      .attr("id", "pdf-preview-start");
    var Header = this.pdfPreviewPage1
      .append("div")
      .style("display", "flex")
      .style("justify-content", "space-between")
      .style("padding", "10px 90px");
    Header.append("div").text(this.coveringLetter.tenderNo);
    Header.append("div").text(this.coveringLetter.date);
    var Address = this.pdfPreviewPage1
      .append("div")
      .style("display", "flex")
      .style("white-space", "pre-line")
      .style("font-weight", "600")
      .style("padding", "15px 90px");
    Address.node().innerHTML = toAddress;
    var subject = this.pdfPreviewPage1
      .append("div")
      .style("display", "flex")
      .style("font-weight", "600")
      .style("padding", "15px 90px")
      .text("SUB : " + this.coveringLetter.subject);
    var reference = this.pdfPreviewPage1
      .append("div")
      .style("display", "flex")
      .style("font-weight", "600")
      .style("padding", "15px 90px")
      .text("REF : " + this.coveringLetter.reference);

    const tableHeader = [
      { name: "S.No", width: "100px" },
      { name: "Name of the Material", width: "500px" },
      { name: "Total Qty", width: "100px" },
      { name: "UOM", width: "100px" }
    ];
    var table = this.pdfPreviewPage1
      .append("table")
      .style("margin", "15px 90px")
      .style("border-collapse", "collapse");
    var thead = table.append("thead");
    var tbody = table.append("tbody");
    thead
      .append("tr")
      .selectAll("th")
      .data(tableHeader)
      .enter()
      .append("th")
      .text(function(d, i) {
        return d.name;
      })
      .style("width", function(d, i) {
        return d.width;
      })
      .style("border", "solid 1px")
      .style("height", "40px");
    var rows = tbody
      .selectAll("tr")
      .data(this.coveringLetter.materials)
      .enter()
      .append("tr");
    var cells = rows
      .selectAll("td")
      .data(
        function(d) {
          return Object.values(d).map(function(material) {
            return material;
          });
        }.bind(this)
      )
      .enter()
      .append("td")
      .text(function(d, i) {
        return d;
      })
      .style("padding", "10px 5px")
      .style("text-align", "center")
      .style("border", "solid 1px");

    // console.log(table.node().getBoundingClientRect().height + 15);
    // // console.log(this.pdfPreviewPage1.node().getBoundingClientRect().height);
    var letter = this.pdfPreviewPage1
      .append("div")
      .style("margin", "15px 90px");
    letter
      .append("div")
      .style("font-weight", "600")
      .text("Dear Sir/Madam,");
    var letterHead = letter
      .append("div")
      .style("margin", "15px 0px")
      .text(
        "In response to your above Invitation to tender, We ,TCC ENERGY SOLUTIONS  “ TCC”  are " +
          "Pleased to submit our offer for Repair, testing, supply of Transformers,at our works in PLOT NO 29, AUOMOTIVE PARK, TSIIC, MEDAK DISTRICT, TELANGANA."
      );
    var letterAttatchments = letter.append("div").style("margin", "15px 0px");
    letterAttatchments
      .style("padding-left", "15px")
      .text("•	We attach herewith the following documents for your reference.");

    // table for the attatchments
    const AttatchmenttableHeader = [
      { name: "INDEX", width: "400px" },
      { name: "Submitted", width: "100px" }
    ];
    const Attatchmenttabledata = [
      "•	MSME  UDYOG AADHAAR MEMORANDUM ",
      "•	NSIC CERTIFICATE",
      "•	ISO 9001:2015 ",
      "•	GST, PAN CARD  Etc"
    ];
    var Attatchmentstable = this.pdfPreviewPage1
      .append("table")
      .style("margin", "15px 90px")
      .style("border-collapse", "collapse");
    var Attatchmentsthead = Attatchmentstable.append("thead");
    var Attatchmentstbody = Attatchmentstable.append("tbody");
    Attatchmentsthead.append("tr")
      .selectAll("th")
      .data(AttatchmenttableHeader)
      .enter()
      .append("th")
      .text(function(d, i) {
        return d.name;
      })
      .style("width", function(d, i) {
        return d.width;
      })
      .style("border", "solid 1px")
      .style("height", "40px");
    var Attatchmentsrows = Attatchmentstbody.append("tr").style(
      "border",
      "solid 1px"
    );
    var Attatchmentscells = Attatchmentsrows.append("td")
      .style("padding-left", "40px")
      .style("font-weight", "600");
    Attatchmentscells.selectAll("td")
      .data(function(d, i) {
        return Attatchmenttabledata;
      })
      .enter()
      .append("div")
      .text(function(d, i) {
        return d;
      })
      .style("text-align", "left")
      .style("padding", "2px 0px");
    Attatchmentsrows.append("td")
      .style("border-left", "solid 1px")
      .style("text-align", "center")
      .style("font-weight", "600")
      .text("YES");
    if (table.node().getBoundingClientRect().height + 15 > 200) {
      cells.style("padding", "0px 0px");
      Attatchmentscells.style("padding", "0px 0px").style(
        "padding-left",
        "40px"
      );
      reference.style("padding", "0px 90px");
    }
    this.pdfForPreviewCoveringLetterPage2();
  }
  pdfForPreviewCoveringLetterPage2() {
    d3.select("#pdf-preview-1").style("font-size", "13px");
    this.pdfPreviewPage2 = d3
      .select("#pdf-preview-1")
      .append("div")
      .attr("id", "pdf-preview1-start");
    var head = this.pdfPreviewPage2.append("div").style("margin", "15px 90px");
    head.text(
      "We “TCC ENERGY SOLUTIONS” MSME (Start-ups) falling within the definition as per Gazette notification GSR 501(E) dt 23.05.2017 are exempted from meeting the qualification criteria for tendered/quoted item(s) as per definition & Eligibility of Start-up in line with OM vide letter no. F-20/2/2014 PPD (pt.) dt.25.07.2016 of under Secretary, GOI with subsequent amendments. ‘"
    );
    var letterPoints = this.pdfPreviewPage2
      .append("ul")
      .style("margin", "15px 90px")
      .style("margin-left", "100px");

    for (let i = 0; i < this.coveringLetter.commonPoints.length; i++) {
      var point = letterPoints.append("li").style("padding", "7px 0px");
      point
        .append("span")
        .text(this.coveringLetter.commonPoints[i].head)
        .style("font-weight", "600");
      point.append("span").text(this.coveringLetter.commonPoints[i].content);
      if (this.coveringLetter.commonPoints[i].head == "WARRANT : ") {
        point
          .append("div")
          .text(
            "The Warranty period of the Transformer should cover the period against manufacturing defects only. Warranty shall not be applicable against tampered seals, improper handling & storage, improper commissioning, usage & maintenance and etc."
          );
      }
    }
    this.pdfPreviewPage2
      .append("div")
      .style("margin", "15px 90px")
      .text(
        "We shall be Glad to furnish any further information or clarification required by you, and await your valued instructions, which will receive our most careful ad prompt attention."
      );
    var greetings = this.pdfPreviewPage2
      .append("div")
      .style("display", "flex")
      .style("justify-content", "space-between")
      .style("margin", "15px 120px");
    greetings.append("div").text("Encl: As above");
    greetings.append("div").text("Yours faithfully,");
  }
  // end of covering letter
  pdfForPreviewFormate() {
    var toAdress = this.coveringLetter.toAddress.replace(/,/g, "," + "&#10;");
    return toAdress;
  }

  pdfPreviewHander($event: any) {
    this.pdfPreviewFlag = !$event;
  }

}
