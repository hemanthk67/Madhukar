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
    customer:{ name:'',
    refer:'Mr. Mangesh Tiwari',
    address:'M/s Shriman Electrical Asso,Timber Market ,Koper Khairane ,Navi Mumbai 400709.',
    phone:'9989497851',
    email:'purchase@shrimanelectrical.com'
  },
  issueDate:'',
    subject:'Offer for Supply of',
    items:[
      {descrition:'250KVA, 0.415/0.380KV Dry Type Panel LTG. T/F.',
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
    // this.submit();
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
    var toAddress = this.pdfForPreviewFormate();
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
      .style('font-size','14px')
      .style('font-weight','600')
      .append('div')
      .text("DATE : 01.07.2020")
      .style('float','right')
      .style('font-size','14px')
      .style('font-weight','500');
      this.pdfPreviewPage1.append('div')
      .text(this.offer.customer.refer)
      .style('font-size','14px')
      .style('margin-top','20px')
      .style('font-weight','600');
     var address = this.pdfPreviewPage1.append('div')
      .style('font-size','14px')
      .style("white-space", "pre-line")
      .style('margin-top','5px');
      address.node().innerHTML = toAddress;
      this.pdfPreviewPage1.append('div')
      .text('Ph:' + this.offer.customer.phone)
      .style('font-size','14px')
      .style('margin-top','2px');
      this.pdfPreviewPage1.append('div')
      .text('Email:' + this.offer.customer.email)
      .style('font-size','14px')
      .style('margin-top','2px')
      .style('text-decoration','underline')
      .style('color','#163a9a');
      this.pdfPreviewPage1.append('div')
      .text('Sub: ')
      .style('font-size','14px')
      .style('margin-top','20px')
      .style('font-weight','600')
      .append('span')
      .text(this.offer.subject)
      .style('font-weight','500');

      var items = this.pdfPreviewPage1.append('div')
      .style('margin-top','10px')
      .style('display','flex')
      .style('font-weight','600');

      items.append('div')
      .text('S.No')       
      .style('width','9%')
      .style('text-align','center')
      .style('border','solid 1px')
      .style('line-height','32px');

      items.append('div')
      .text('Description')
      .style('width','40%')
      .style('text-align','center')
      .style('border','solid 1px')
      .style('line-height','32px');

      items.append('div')
      .text('Unit Ex-Works Price')
      .style('width','18%')
      .style('text-align','center')
      .style('border','solid 1px');

      items.append('div')
      .text('Qty')
      .style('width','9%')
      .style('text-align','center')
      .style('border','solid 1px')
      .style('line-height','32px');
      
      items.append('div')
      .text('Total Ex-Works Price (Rupees)')
      .style('width','22%')
      .style('text-align','center')
      .style('border','solid 1px');
      for(let i =0; i < this.offer.items.length; i++) {
        var item = this.pdfPreviewPage1.append('div')
        .style('display','flex')
        .style('font-weight','500')
        .style('min-height','30px');
  
        item.append('div')
        .text(i+1)       
        .style('width','9%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
  
        item.append('div')
        .text(this.offer.items[i].descrition)
        .style('width','40%')
        .style('text-align','center')
        .style('border','solid 1px');
  
        item.append('div')
        .text(this.offer.items[i].unitPrice)
        .style('width','18%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
  
        item.append('div')
        .text(this.offer.items[i].qty)
        .style('width','9%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
        
        item.append('div')
        .text(this.offer.items[i].totalPrice)
        .style('width','22%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
      }

      var items = this.pdfPreviewPage1.append('div')
      .style('display','flex')
      .style('font-weight','600');

      items.append('div')
      .text('TOTAL EX-WORKS PRICE: (' + this.subTotalPriceWords + ')')       
      .style('width','77%')
      .style('border','solid 1px');

      items.append('div')
      .text(this.subTotalPrice)
      .style('width','22%')
      .style('text-align','center')
      .style('border','solid 1px')
      .style('line-height','32px');
 
      this.pdfPreviewPage1.append('div')
      .style('margin-top', '30px')
      .style('margin-bottom', '30px')
      .text("Commercial Terms & Conditions")
      .style('text-align','center')
      .style('font-size','20px')
      .style('font-weight','600')
      .style('text-decoration','underline');
      for(let i =0; i < this.offer.terms.length; i++) {
        if( (d3.select("#pdf-preview") as any).node().getBoundingClientRect().height > ((d3.select("#pdf-preview-start") as any).node().getBoundingClientRect().height+ 124 + 110)) {
        var item = this.pdfPreviewPage1.append('div')
        .style('display','flex')
        .style('font-weight','500')
        .style('min-height','30px');
  
        item.append('div')      
        .style('width','15%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px')
        .append('div')
        .style('position','relative')
        .style('top','40%')
        .text(this.romanNumbers[i]);
  
        item.append('div')
        .style('width','30%')
        .style('text-align','center')
        .style('font-weight','600')
        .style('border','solid 1px')
        .append('div')
        .style('position','relative')
        .style('top','40%')
        .text(this.offer.terms[i].lable);

        item.append('div')
        .text(this.offer.terms[i].content)
        .style('width','54%')
        .style('text-align','center')
        .style('border','solid 1px');
        }
  
      }
      console.log((d3.select("#pdf-preview") as any).node().getBoundingClientRect().height);
      console.log((d3.select("#pdf-preview-start") as any).node().getBoundingClientRect());
  }
  pdfPreviewHandler($event: any) {
    this.pdfPreviewFlag = !$event;
  }
  pdfForPreviewFormate() {
    var toAdress = this.offer.customer.address.replace(/,/g, "," + "&#10;");
    return toAdress;
  }
  convertNumberToWords(value) {
    var fraction = Math.round(this.frac(value)*100);
    var f_text  = "";

    if(fraction > 0) {
        f_text = "AND "+this.convert_number(fraction)+" PAISE";
    }

    return this.convert_number(value)+" RUPEES "+f_text;
}
frac(f) {
  return f % 1;
}
convert_number(number)
{
    if ((number < 0) || (number > 999999999)) 
    { 
        return "NUMBER OUT OF RANGE!";
    }
    var Gn = Math.floor(number / 10000000);  /* Crore */ 
    number -= Gn * 10000000; 
    var kn = Math.floor(number / 100000);     /* lakhs */ 
    number -= kn * 100000; 
    var Hn = Math.floor(number / 1000);      /* thousand */ 
    number -= Hn * 1000; 
    var Dn = Math.floor(number / 100);       /* Tens (deca) */ 
    number = number % 100;               /* Ones */ 
    var tn= Math.floor(number / 10); 
    var one=Math.floor(number % 10); 
    var res = ""; 

    if (Gn>0) 
    { 
        res += (this.convert_number(Gn) + " CRORE"); 
    } 
    if (kn>0) 
    { 
            res += (((res=="") ? "" : " ") + 
            this.convert_number(kn) + " LAKH"); 
    } 
    if (Hn>0) 
    { 
        res += (((res=="") ? "" : " ") +
            this.convert_number(Hn) + " THOUSAND"); 
    } 

    if (Dn) 
    { 
        res += (((res=="") ? "" : " ") + 
            this.convert_number(Dn) + " HUNDRED"); 
    } 


    var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX","SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN","FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN","NINETEEN"); 
var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY","SEVENTY", "EIGHTY", "NINETY"); 

    if (tn>0 || one>0) 
    { 
        if (!(res=="")) 
        { 
            res += " AND "; 
        } 
        if (tn < 2) 
        { 
            res += ones[tn * 10 + one]; 
        } 
        else 
        { 

            res += tens[tn];
            if (one>0) 
            { 
                res += ("-" + ones[one]); 
            } 
        } 
    }

    if (res=="")
    { 
        res = "zero"; 
    } 
    return res;
}
}
