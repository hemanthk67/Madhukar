import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MarketingService } from 'src/app/services/internal/marketing/marketing.service';
import { RoutingService } from 'src/app/services/routing.service';
import { InfoService } from 'src/app/services/internal/info.service';
import { pdfFileService } from 'src/app/services/pdfFile.service';
import { DocumentsService } from 'src/app/services/common/documents.service';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {
  pdfPreviewFlag: boolean;
  documentName: any;
  constructor( private pdf:pdfFileService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public marketingService: MarketingService,
    private routingService: RoutingService,
    public infoService:InfoService,
    public documentsService: DocumentsService) {
      iconRegistry.addSvgIcon(
        "down-spiral",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/down-spiral.svg")
        );
        iconRegistry.addSvgIcon(
          "pdf-icon",
          sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pdf-icon.svg")
        );
        iconRegistry.addSvgIcon(
          "edit-icon",
          sanitizer.bypassSecurityTrustResourceUrl("assets/icons/edit-icon.svg")
        );
     }

  ngOnInit() {
  }
  read(index) {
    this.marketingService.data[this.marketingService.data.length - 1 - index].flag = !this.marketingService.data[this.marketingService.data.length - 1 - index].flag;
    for(let i = 0 ; i < this.marketingService.data.length; i++) {
      if( (this.marketingService.data.length - 1 - index) != i ) {
      this.marketingService.data[i].flag = true;
      }
    }
  }
  downloadFile(path) {
    this.pdf.downloadPdf(path);
  }
  approval(value, index) {
   this.marketingService.originalData[this.marketingService.originalData.length - index - 1].status = value;
   this.marketingService.setEnquiryData(this.marketingService.originalData[this.marketingService.originalData.length - index - 1]);
   this.marketingService.data[this.marketingService.originalData.length - index - 1].status = value;
  }
  prepareOffer(index) {
    this.marketingService.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - index - 1]; 
    this.documentName = this.marketingService.enquiry.customer + ' OFFER P - ' + this.marketingService.enquiry.number;
    this.routingService.prepareOffer();
  }
  enquiryResults(index) {
    this.marketingService.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - index - 1]; 
    // this.routingService.enquiryResults();
  }
  edit(index) {
    this.marketingService.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - index - 1]; 
    this.marketingService.editFlag = true;
    this.routingService.newEnquiry();
  }
  editoffer(index) {
    this.marketingService.enquiry = this.marketingService.originalData[this.marketingService.originalData.length - index - 1]; 
    this.marketingService.editOfferFlag = true;
    this.routingService.prepareOffer();
  }

  //pdf for prepare offer
  prepareOfferPdf(index) {
    for(let i=0; i < this.infoService.pvtCustomerData.length; i++) {
      if(this.infoService.pvtCustomerData[i].fullName == this.marketingService.originalData[this.marketingService.originalData.length - index - 1].customer) {
      var customerReference = this.infoService.pvtCustomerData[i]
      }
         }
         this.documentName = this.marketingService.originalData[this.marketingService.originalData.length - index - 1].customer + ' OFFER P - ' + this.marketingService.originalData[this.marketingService.originalData.length - index - 1].number;
    var subTotalPriceWords = this.convertNumberToWords(this.marketingService.originalData[this.marketingService.originalData.length - index - 1].offer.totalPrice) + 'Only';
    this.pdfPreviewFlag = true; // for the pdfPreview 
    this.documentsService.enquiryOffer(this.marketingService.originalData[this.marketingService.originalData.length - index - 1], customerReference , this.marketingService.originalData[this.marketingService.originalData.length - index - 1].offer, subTotalPriceWords, this.marketingService.originalData[this.marketingService.originalData.length - index - 1].offer.totalPrice);
  
  }

  pdfPreviewHandler($event: any) {
    this.pdfPreviewFlag = !$event;
  }
  pdfPreviewconfirm($event: any) {
    if($event) {
      this.pdfPreviewFlag = false;
  }
  }
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
}
