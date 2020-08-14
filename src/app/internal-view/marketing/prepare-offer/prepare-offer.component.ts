import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { InfoService } from 'src/app/services/internal/info.service';
import { MarketingService } from 'src/app/services/internal/marketing/marketing.service';
import { DocumentsService } from 'src/app/services/common/documents.service';


import * as jsonData from "./prepare-offer.json";


@Component({
  selector: 'app-prepare-offer',
  templateUrl: './prepare-offer.component.html',
  styleUrls: ['./prepare-offer.component.scss']
})
export class PrepareOfferComponent implements OnInit {

  
  JsonData: any = (jsonData as any).default;

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
  documentName: any;
  constructor(    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public infoService:InfoService,
    public marketingService: MarketingService,
    public documentsService: DocumentsService) { 
      iconRegistry.addSvgIcon(
        "calander",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
      );
    }

  ngOnInit() { 
    // setTimeout(
    //   function() {
   this.enquiry = this.marketingService.enquiry;
  // this.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - 2]; 
   for(let i=0; i < this.infoService.pvtCustomerData.length; i++) {
if(this.infoService.pvtCustomerData[i].fullName == this.enquiry.customer) {
this.customerReference = this.infoService.pvtCustomerData[i];
}
   }
    this.pdfPreviewFlag = false; // for the pdfPreview
    this.offerDataFormate();
  
    //     this.submit();
    //   }.bind(this),
    //   3000
    // );

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
    for(let i=0; i < this.customerReference.details.length; i++) {
      console.log(this.customerReference.details[i].name, this.offer.customer.refer);
      if(this.customerReference.details[i].name == this.offer.customer.refer) {
      this.offer.customer.address = this.customerReference.details[i].address;
      this.offer.customer.phone = this.customerReference.details[i].phone;
      this.offer.customer.email = this.customerReference.details[i].email;
      }
         }
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
    this.documentsService.enquiryOffer(this.enquiry, this.customerReference, this.offer, this.subTotalPriceWords, this.subTotalPrice);
    
  }

  pdfPreviewHandler($event: any) {
    this.pdfPreviewFlag = !$event;
  }
  pdfPreviewconfirm($event: any) {
    if($event) {
    this.enquiry.offer = {...this.offer};
this.marketingService.setEnquiryData(this.enquiry);
  }
  }
 
  //external fucntions

  // indian number to word function
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
// End indian number to word function
// Data formating
offerDataFormate() {
  
  this.offer = {...this.JsonData};
  this.offer.customer.name = this.enquiry.customer;
  this.offer.issueDate = this.enquiry.issueDate;
  var item = {
    description:'250KVA, 0.415/0.380KV Dry Type Panel LTG. T/F.',
  unitPrice:0.00,
qty:0.00,
totalPrice:0.00};
this.offer.itemsPrice = [];
  for(let i=0; i < this.enquiry.items.length; i++) {
    item = {
      description:this.enquiry.items[i].description,
    unitPrice:0.00,
  qty:this.enquiry.items[i].qty,
  totalPrice:0.00};
this.offer.itemsPrice.push({...item});
  }
    // var kva = '';
    // var Class= '';
    for(let i=0; i < this.enquiry.items.length; i++) {
      // kva = kva + this.marketingService.enquiry.items[i] 
      if( i == this.enquiry.items.length - 1 && i !== 0) {
        this.offer.subject = this.offer.subject + 'and ' + this.enquiry.items[i].rating + 'KVA-' + this.enquiry.items[i].classHv + '/' + this.enquiry.items[i].classLv + 'KV.';
      } else {
        this.offer.subject = this.offer.subject + this.enquiry.items[i].rating + 'KVA-' + this.enquiry.items[i].classHv + '/' + this.enquiry.items[i].classLv + 'KV, '; 
      }
          }

          this.documentName = this.enquiry.customer + ' OFFER P - ' + this.enquiry.number;
         
}
// End Data formating
}
