import { Component, OnInit, AfterViewInit, Input, Type } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import * as d3 from "d3";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"],
})
export class LogoComponent implements OnInit, AfterViewInit {
  @Input() type;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "logo",
      sanitizer.bypassSecurityTrustResourceUrl("assets/logo/Group.svg")
    );
  }

  ngOnInit() {
    console.log("test");
    console.log(this.type);
  }
  ngAfterViewInit() {
    this.logoAnimation();
  }

  logoAnimation() {
    setTimeout(
      function () {
        if (this.type == "internal-page") {
          d3.select(".icon-logo")
            .style("width", "150px")
            .style("height", "150px");
        }
        // const logoSvg = d3.select("svg").style("overflow", "visible");
        // const logoIso = d3.select("#logo-iso").style("display", "none");
        const logoPart1 = d3
          .select("#logo-part-1")
          .transition()
          .attr("transform", "rotate(180)")
          .transition()
          .attr("opacity", 1)
          .attr("transform", "rotate(360)")
          .duration(2500);
        const logoPart2 = d3
          .select("#logo-part-2")
          .transition()
          .attr("transform", "rotate(90)")
          .transition()
          .attr("opacity", 1)
          .attr("transform", "rotate(360)")
          .duration(2500);
        const logoPart3 = d3
          .select("#logo-part-3")
          .transition()
          .attr("transform", "rotate(90)")
          .transition()
          .attr("opacity", 1)
          .attr("transform", "rotate(360)")
          .duration(2500);
        const logoTcc = d3
          .select("#logo-tcc")
          .transition()
          .attr("opacity", 1)
          .duration(2500);
        const group = d3
          .select(".icon-logo")
          .transition()
          .style("opacity", 1)
          .delay(500)
          .duration(500);
      }.bind(this),
      200
    );
  }
}
