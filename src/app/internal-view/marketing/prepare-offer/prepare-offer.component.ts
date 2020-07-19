import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import * as d3 from "d3";

@Component({
  selector: 'app-prepare-offer',
  templateUrl: './prepare-offer.component.html',
  styleUrls: ['./prepare-offer.component.scss']
})
export class PrepareOfferComponent implements OnInit {
  offer = {
    customer:'',
    issueDate:'',
    subject:'Offer for Supply of',
    items:[
      {descrition:'',
    unitPrice:0.00,
  qty:0.00,
totalPrice:0.00}
    ],
    totalPrice:0.00,
    terms:[{
      lable:'Taxes & Duties',
      content:'The quoted Price is exclusive of GST. At present GST will be 18%. Entry Tax / Octroi Duty will be extra if any as applicable at actual. Any changes in taxes and duties/any new Taxes and Duties that get attracted at the time of actual delivery shall be to your account.'
    },
    {
      lable:'Freight',
      content:'Freight charges are EXTRA at actual.'
    },
    {
      lable:'Terms of payment',
      content:'50% advance payment along with PO and remaining 50% against Performa Invoice before dispatch of the material.'
    },
    {
      lable:'Delivery',
      content:'Delivery shall be done with in 5 to 8 weeks from the date of receipt of advance payment.'
    },
    {
      lable:'Warranty',
      content:'Twelve months from the date of commissioning or eighteen months from the date of dispatch, whichever is earlier.'
    },{
      lable:'Validity',
      content:'Our Offer is valid up to 30 days from the date of this offer.'
    },
    {
      lable:'Tests',
      content:'Routine tests shall be conducted on transformer at our works without additional cost.'
    },
    {
      lable:'Erection & Commissioning',
      content:'Our scope is limited to Design, Manufacture, Supply of the transformer and Testing at our works.'
    }],
    signBy: 'Thota V',
    authorizedPhoneNumber: '9345099945',
    officeNumber: '040-27760334',
    email: 'marketing@tccpltd.com'
  };
  subTotalPrice = '0.00/-';
  subTotalPriceWords = 'Zero Only';
  calanderFlag = {
    issueDate: false,
  };
  romanNumbers = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
 public flag = {
    organization: true,
    issueDate: true,
   };
   
  pdfPreviewFlag: any;
  pdfPreviewPage1: any;
  pdfPreviewPage2;
  constructor(    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) { 
      iconRegistry.addSvgIcon(
        "calander",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
      );
    }

  ngOnInit() { 
    this.pdfPreviewFlag = false; // for the pdfPreview
    this.submit();
  }
  calanderOpen(value) {
    this.calanderFlag.issueDate = !this.calanderFlag.issueDate;
  }
  doTextareaValueChange(ev) {
    try {
      this.offer.subject = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }

  }
  test() {
    console.log(this.offer.terms);
  }
  addItem() {
    var item = {descrition:'',
    unitPrice:0.00,
  qty:0.00,
totalPrice:0.00};
this.offer.items.push(item);
  }
  removeItem(index) {
    this.offer.items.splice(index,1);
  }
  addTerm(){
    var term = {lable:'',
    content:''};
this.offer.terms.push(term);
  }
  removeTerm(index) {
    this.offer.terms.splice(index,1);
  }
  addPrice(index) {
    this.offer.totalPrice = this.offer.totalPrice - this.offer.items[index].totalPrice;
    this.offer.items[index].totalPrice = this.offer.items[index].unitPrice * this.offer.items[index].qty + 0.00;
    this.offer.totalPrice = this.offer.totalPrice + this.offer.items[index].totalPrice;
    this.subTotalPrice = this.offer.totalPrice + '.00/-';
    this.subTotalPriceWords = this.convertNumberToWords(this.offer.totalPrice) + 'Only';
  }
  displayCounter(value) {
    if(value) {
      this.calanderFlag.issueDate = false; 
      this.offer.issueDate = value;
    } else {
this.calanderFlag.issueDate = false;
    }
  }
  contentChanged(ev,index) {
    
    try {
      this.offer.terms[index].content = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
  lableChanged(ev,index) {
    try {
      this.offer.terms[index].lable = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
  submit() {
    this.pdfPreviewFlag = true; // for the pdfPreview
    d3.select("#pdf-preview")
    .selectAll("*")
    .remove();
  setTimeout(
    function() {
      this.offerpdfpreview();
    }.bind(this),
    1000
  );
    
  }
  offerpdfpreview() {
    d3.select("#pdf-preview").style("font-size", "13px");
    this.pdfPreviewPage1 = d3
      .select("#pdf-preview")
      .append("div")
      .attr("id", "pdf-preview-start")
      .style('padding', '0px 70px');
      this.pdfPreviewPage1.append('div')
      .style('margin-bottom', '30px')
      .text("Techno Commercial Offer")
      .style('text-align','center')
      .style('font-size','20px')
      .style('font-weight','600')
      .style('text-decoration','underline');
      this.pdfPreviewPage1.append('div')
      .text("OFFER REF: TCC/PVT-406/SEA/110")
      .style('font-size','12px')
      .style('font-weight','600')
      .append('div')
      .text("DATE : 01.07.2020")
      .style('float','right')
      .style('font-size','12px')
      .style('font-weight','500');
  }
  pdfPreviewHandler($event: any) {
    this.pdfPreviewFlag = !$event;
  }
  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + n_array[j];
                    n_array[i] = 0;
                }
            }
        }
         var value ;
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
}
