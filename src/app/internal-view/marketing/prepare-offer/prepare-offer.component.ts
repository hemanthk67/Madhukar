import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import * as d3 from "d3";
import { InfoService } from 'src/app/services/internal/info.service';
import { MarketingService } from 'src/app/services/internal/marketing/marketing.service';
import { style } from 'd3';

@Component({
  selector: 'app-prepare-offer',
  templateUrl: './prepare-offer.component.html',
  styleUrls: ['./prepare-offer.component.scss']
})
export class PrepareOfferComponent implements OnInit {
  offer:any;
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
  enquiry: any;
  customerReference: any;
  constructor(    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public infoService:InfoService,
    public marketingService: MarketingService,) { 
      iconRegistry.addSvgIcon(
        "calander",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
      );
    }

  ngOnInit() { 
   this.enquiry = this.marketingService.enquiry;
  // this.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - 2]; 
   for(let i=0; i < this.infoService.pvtCustomerData.length; i++) {
if(this.infoService.pvtCustomerData[i].fullName == this.enquiry.customer) {
this.customerReference = this.infoService.pvtCustomerData[i]
}
   }
    this.pdfPreviewFlag = false; // for the pdfPreview
    this.offerDataFormate();

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
  referenceChange() {
// alert('aku');
// console.log(this.customerReference);
// console.log(this.offer.customer);
    for(let i=0; i < this.customerReference.details.length; i++) {
      console.log(this.customerReference.details[i].name, this.offer.customer.refer);
      if(this.customerReference.details[i].name == this.offer.customer.refer) {
      // this.offer.customer.refer = this.customerReference.details[i].name;
      this.offer.customer.address = this.customerReference.details[i].address;
      this.offer.customer.phone = this.customerReference.details[i].phone;
      this.offer.customer.email = this.customerReference.details[i].email;
      }
         }
        //  console.log(this.offer.customer);
  }
  addItem() {
    var item = {description:'',
    unitPrice:0.00,
  qty:0.00,
totalPrice:0.00};
this.offer.itemsPrice.push(item);
  }
  removeItem(index) {
    this.offer.totalPrice = this.offer.totalPrice - this.offer.itemsPrice[index].totalPrice;
    this.offer.itemsPrice.splice(index,1);
    this.subTotalPrice = this.offer.totalPrice + '.00/-';
    this.subTotalPriceWords = this.convertNumberToWords(this.offer.totalPrice) + 'Only';
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
    this.offer.totalPrice = this.offer.totalPrice - this.offer.itemsPrice[index].totalPrice;
    this.offer.itemsPrice[index].totalPrice = this.offer.itemsPrice[index].unitPrice * this.offer.itemsPrice[index].qty + 0.00;
    this.offer.totalPrice = this.offer.totalPrice + this.offer.itemsPrice[index].totalPrice;
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
    d3.select("#pdf-preview").style("font-size", "12px");
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
      .text("OFFER REF: TCC/PVT-" + this.enquiry.number + '/' + this.customerReference.name + '/' + '110')
      .style('font-size','13px')
      .style('font-weight','600')
      .append('div')
      .text("Date :" + this.offer.issueDate)
      .style('float','right')
      .style('font-size','13px')
      .style('font-weight','500');
      this.pdfPreviewPage1.append('div')
      .text('Mr. ' + this.offer.customer.refer)
      .style('font-size','13px')
      .style('margin-top','20px')
      .style('font-weight','600');
      this.pdfPreviewPage1.append('div')
      .text('M/s ' + this.offer.customer.name)
      .style('font-size','13px')
      .style('font-weight','600');
     var address = this.pdfPreviewPage1.append('div')
      .style('font-size','12px')
      .style("white-space", "pre-line");
      address.node().innerHTML = toAddress;
      this.pdfPreviewPage1.append('div')
      .text('Ph:' + this.offer.customer.phone)
      .style('font-size','12px')
      .style('margin-top','2px');
      this.pdfPreviewPage1.append('div')
      .text('Email:' + this.offer.customer.email)
      .style('font-size','12px')
      .style('margin-top','2px')
      .style('text-decoration','underline')
      .style('color','#163a9a');
      this.pdfPreviewPage1.append('div')
      .text('Sub: ')
      .style('font-size','13px')
      .style('margin-top','20px')
      .style('font-weight','600')
      .style('padding', '0 10px')
      .append('span')
      .text(this.offer.subject)
      .style('font-weight','500');
     
this.pdfPreviewPage1.append('div')
.text(' We thank you for your enquiry and the interest shown in our product. In view of the same, we wish to furnish our brief techno- commercial offer as under for your kind consideration.')
.style('margin-top','10px')
.style('padding', '0 10px');

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
      for(let i =0; i < this.offer.itemsPrice.length; i++) {
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
        .text(this.offer.itemsPrice[i].description)
        .style('width','40%')
        .style('text-align','center')
        .style('border','solid 1px');
  
        item.append('div')
        .text(this.offer.itemsPrice[i].unitPrice)
        .style('width','18%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
  
        item.append('div')
        .text(this.offer.itemsPrice[i].qty)
        .style('width','9%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
        
        item.append('div')
        .text(this.offer.itemsPrice[i].totalPrice)
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
      var nextPage = d3
      .select("#pdf-preview-1")
      .append("div")
      .attr("id", "pdf-preview-start")
      .style('padding', '20px 70px');
      var item: any;
      for(let i =0; i < this.offer.terms.length; i++) {
        if( (d3.select("#pdf-preview") as any).node().getBoundingClientRect().height > ((d3.select("#pdf-preview-start") as any).node().getBoundingClientRect().height+ (d3.select("#pdf-preview-header") as any).node().getBoundingClientRect().height + 130)) {
         item = this.pdfPreviewPage1.append('div')
        .style('display','flex')
        .style('font-weight','500')
      .style('font-size','12px')
        .style('min-height','50px');
      } else {
         item = nextPage.append('div')
        .style('display','flex')
        .style('font-weight','500')
      .style('font-size','12px')
        .style('min-height','50px');
      }
        var sno = item.append('div')      
        .style('width','15%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px')
        .append('div')
        .text(this.romanNumbers[i]);
  
        var term = item.append('div')
        .style('width','30%')
        .style('text-align','center')
        .style('font-weight','600')
        .style('border','solid 1px')
        .append('div')
        .text(this.offer.terms[i].lable);

        var content = item.append('div')
        .style('width','54%')
        .style('text-align','center')
        .style('border','solid 1px')
        .append('div')
        .text(this.offer.terms[i].content);
      if( content.node().getBoundingClientRect().height < 50){
        content.style('padding-top', (50 - content.node().getBoundingClientRect().height)/2 + 'px');
        }
        term.style('padding-top', (content.node().getBoundingClientRect().height - 12)/2 + 'px');
        sno.style('padding-top', (content.node().getBoundingClientRect().height - 16)/2 + 'px');
      
      }
      // console.log((d3.select("#pdf-preview") as any).node().getBoundingClientRect().height);
      // console.log((d3.select("#pdf-preview-start") as any).node().getBoundingClientRect().height);
      // console.log((d3.select("#pdf-preview-header") as any).node().getBoundingClientRect().height);
      this.offerpdfpreview2();
  }
  offerpdfpreview2() {
    d3.select("#pdf-preview").style("font-size", "12px");
    this.pdfPreviewPage2 = d3
      .select("#pdf-preview-1")
      .append("div")
      .attr("id", "pdf-preview-start")
      .style('padding', '0px 70px');
      this.pdfPreviewPage2.append('div')
      .style('margin-top', '15px')
      .text("* All other terms will be as per our general conditions of sale.");
      this.pdfPreviewPage2.append('div')
      .style('margin-top', '15px')
      .text("We shall be glad to furnish any further information (or) clarifications required by you and await your valued instructions, which will receive our most careful and prompt attention.");
      var reference = this.pdfPreviewPage2
      .append('div')
      .style('text-align', 'right')
      .style('margin-top', '15px');

      reference
      .append('div')
      .text('With Best Regards');
      reference
      .append('div')
      .text(this.offer.signBy);
      reference
      .append('div')
      .text('Cell: ' + this.offer.authorizedPhoneNumber);
      reference
      .append('div')
      .text('Ph: ' + this.offer.officeNumber);
      reference
      .append('div')
      .text('Email: ')
      .append('span')
      .text(this.offer.email)
      .style('color','rgb(22, 58, 154)')
      .style('text-decoration','underline');

      var businessPartnersListadd =  this.pdfPreviewPage2.append('div')
      .style('margin-top', '10px');
      businessPartnersListadd.append('div')
      .text('Trusted Business Partners')
      .style('text-align','center')
      .style('color','rgb(22, 58, 154)')
      .style('font-size','12px')
      .style('font-weight','600')
      .style('margin-bottom','5px');
     var businessPartners =  businessPartnersListadd.append('div')
      .style('border-radius','10px')
      .style('border','solid 2px rgb(22, 58, 154)')
      .style('background-color','#F9F9F9')
      .style('width','80%')
      .style('margin','auto');
let businessPartnersList = [ {
  name:'ministryofwaterresources',
  size: '80px',
  marginBottom: '10px',
  flag: true
},{
  name:'bhel',
  size: '65px',
  marginBottom: '20px',
  flag: true
},{
  name:'vizagsteel',
  size: '55px',
  marginBottom: '15px',
  flag: true
},{
  name:'indianrailways',
  size: '70px',
  marginBottom: '13px',
  flag: true
},{
  name:'nmdc',
  size: '65px', 
  marginBottom: '13px',
  flag: true
},{
  name:'ordinance',
  size: '50px',
  marginBottom: '13px',
  flag: true
},{
  name:'npcil',
  size: '70px',
  marginBottom: '13px',
  flag: true
},{
  name:'apspdcl',
  size: '70px',
  marginBottom: '13px',
  flag: true
},{
  name:'bandr',
  size: '55px',
  marginBottom: '15px',
  flag: true
},{
  name:'aptransco',
  size: '85px',
  marginBottom: '20px',
  flag: true
},{
  name:'apgenco',
  size: '60px',
  marginBottom: '24px',
  flag: true
},{
  name:'apepdcl',
  size: '63px',
  marginBottom: '17px',
  flag: true
},{
  name:'tsspdcl',
  size: '70px',
  marginBottom: '15px',
  flag: true
},{
  name:'tsnpdcl',
  size: '70px',
  marginBottom: '15px',
  flag: true
},{
  name:'tstransco',
  size: '70px',
  marginBottom: '13px',
  flag: true
},{
  name:'tsgenco',
  size: '75px',
  marginBottom: '13px',
  flag: true
},{
  name:'mescom',
  size: '60px',
  marginBottom: '13px',
  flag: true
},{
  name:'gescom',
  size: '70px',
  marginBottom: ' 13px',
  flag: true
}];
this.businessPartnersListArrangement(businessPartnersList, businessPartners, businessPartnersListadd);
 businessPartnersListadd =  this.pdfPreviewPage2.append('div')
.style('margin-top', '10px');
businessPartnersListadd.append('div')
.text('Solar Invertor Duty Transformers')
.style('text-align','center')
.style('color','rgb(22, 58, 154)')
.style('font-size','12px')
.style('font-weight','600')
.style('margin-bottom','3px')
.append('div')
.text('Few of our prestigious clients')
.style('text-align','center')
.style('color','rgb(22, 58, 154)')
.style('font-size','10px')
.style('margin-bottom','5px');
var businessPartners =  businessPartnersListadd.append('div')
.style('border-radius','10px')
.style('border','solid 2px rgb(22, 58, 154)')
.style('background-color','#F9F9F9')
.style('width','50%')
.style('margin','auto');
let solarBusinessPartnersList = [ {
  name:'mytrah',
  size: '50px',
  marginBottom: '10px',
  flag: true
},{
  name:'bhel',
  size: '50px',
  marginBottom: '10px',
  flag: true
},{
  name:'mahagenco',
  size: '85px',
  marginBottom: '0px',
  flag: true
},{
  name:'bepl',
  size: '90px',
  marginBottom: '15px',
  flag: true
},{
  name:'kpgroup',
  size: '55px', 
  marginBottom: '3px',
  flag: true
},{
  name:'genret',
  size: '60px',
  marginBottom: '3px',
  flag: true
},{
  name:'winsol',
  size: '90px',
  marginBottom: '3px',
  flag: true
}];
this.solarBusinessPartnerListArrangement(solarBusinessPartnersList, businessPartners, businessPartnersListadd);

    }
    businessPartnersListArrangement(businessPartnersList, businessPartners, businessPartnersListadd) {
      for(let i=0; i < businessPartnersList.length ; i++) {
        var border = businessPartners
         .append('img')
   .attr('src', './assets/logo/' + businessPartnersList[i].name + 'Logo.png')
   .style('width', businessPartnersList[i].size)
   .style('height', '55px')
   .style('margin', '7px')
   .style('margin-bottom', businessPartnersList[i].marginBottom)
   .on("click", function() {
           console.log(i);
            businessPartners.remove();
           businessPartnersList.splice( i, 1)
           if(businessPartnersList.length !== 0) {
            businessPartners =  businessPartnersListadd.append('div')
            .style('border-radius','10px')
            .style('border','solid 2px rgb(22, 58, 154)')
            .style('background-color','#F9F9F9')
            .style('width','80%')
            .style('margin','auto');
           this.businessPartnersListArrangement(businessPartnersList, businessPartners, businessPartnersListadd);
           } else {
            businessPartnersListadd.remove();
           }
           }.bind(this));
   if (i !== 5 && i !== 11 && i !== 17 && i !== 23 && i !== businessPartnersList.length-1) {
     businessPartners
     .append('svg')
   .attr('width', '3px')
           .attr('height', '70px')
     .append("line")          // attach a line
       .style("stroke", "rgb(22, 58, 154)")  // colour the line
       .attr("x1", 2)     // x position of the first end of the line
       .attr("y1", 0)      // y position of the first end of the line
       .attr("x2", 2)     // x position of the second end of the line
       .attr("y2", 50);
   }
   if( i >5 ) {
     border.style('margin-top','0px');
   }
   }
    }
    solarBusinessPartnerListArrangement(solarBusinessPartnersList, businessPartners, businessPartnersListadd) {
      for(let i=0; i < solarBusinessPartnersList.length ; i++) {
        var border = businessPartners
         .append('img')
      .attr('src', './assets/logo/' + solarBusinessPartnersList[i].name + 'Logo.png')
      .style('width', solarBusinessPartnersList[i].size)
      .style('margin', '5px')
      .style('margin-bottom', solarBusinessPartnersList[i].marginBottom)
      .on("click", function() {
        console.log(i);
         businessPartners.remove();
        solarBusinessPartnersList.splice( i, 1)
        if(solarBusinessPartnersList.length !== 0) {
         businessPartners =  businessPartnersListadd.append('div')
.style('border-radius','10px')
.style('border','solid 2px rgb(22, 58, 154)')
.style('background-color','#F9F9F9')
.style('width','50%')
.style('margin','auto');
        this.solarBusinessPartnerListArrangement(solarBusinessPartnersList, businessPartners, businessPartnersListadd);
        } else {
          businessPartnersListadd.remove();
        }
        }.bind(this));
      
      if(i !== 3 && i !== 7 && i !== 11 && i !== solarBusinessPartnersList.length-1) {
      businessPartners
      .append('svg')
      .attr('width', '3px')
           .attr('height', '50px')
      .append("line")          // attach a line
       .style("stroke", "rgb(22, 58, 154)")  // colour the line
       .attr("x1", 2)     // x position of the first end of the line
       .attr("y1", 0)      // y position of the first end of the line
       .attr("x2", 2)     // x position of the second end of the line
       .attr("y2", 30);
      }
      if( i==0 || i ==2 || i==3) {
        border.style('margin','3px').style('margin-bottom', solarBusinessPartnersList[i].marginBottom);
      }
        
      if( i > 3 ) {
      border.style('margin-top','0px');
      }
      if( i ==4) {
        border.style('margin-left','65px')
      }
      }
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
offerDataFormate() {
  this.offer = {
    customer:{ name: this.enquiry.customer,
    refer:'Mr. Mangesh Tiwari',
    address:'M/s Shriman Electrical Asso,Timber Market ,Koper Khairane ,Navi Mumbai 400709.',
    phone:'9989497851',
    email:'purchase@shrimanelectrical.com'
  },
  issueDate:this.enquiry.issueDate,
    subject:'Offer for Supply of fasdhfaksdhjf kasdjfh kasjdn fkahsdf  asd fas dfas dfa sdf asdf asdf ',
    itemsPrice:[],
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
  var item = {
    description:'250KVA, 0.415/0.380KV Dry Type Panel LTG. T/F.',
  unitPrice:0.00,
qty:0.00,
totalPrice:0.00};
  for(let i=0; i < this.enquiry.items.length; i++) {
    item = {
      description:this.enquiry.items[i].description,
    unitPrice:0.00,
  qty:this.enquiry.items[i].qty,
  totalPrice:0.00};
this.offer.itemsPrice.push({...item});
  }
}
}
