import { Injectable } from '@angular/core';
import * as d3 from "d3";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  pdfPreviewPage1: any;
  pdfPreviewPage2: any;
  romanNumbers = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  constructor() { }

  // Marketing
  // Prepare Offer
  enquiryOffer(enquiry, customerReference, offer, subTotalPriceWords,  subTotalPrice) {
    d3.select("#pdf-preview")
    .selectAll("*")
    .remove();
  setTimeout(
    function() {
      this.offerpdfpreview(enquiry, customerReference, offer, subTotalPriceWords, subTotalPrice);
    }.bind(this),
    1000
  );
  }
  offerpdfpreview(enquiry, customerReference, offer, subTotalPriceWords, subTotalPrice) {
    var toAddress = this.pdfForPreviewFormate(offer);
    d3.select("#pdf-preview").style("font-size", "12px");
    this.pdfPreviewPage1 = d3
      .select("#pdf-preview")
      .append("div")
      .attr("id", "pdf-preview-start")
      .style('padding', '0px 70px');
      this.pdfPreviewPage1.append('div')
      .style('margin-bottom', '30px')
      .text("TECHNO COMMERCIAL OFFER")
      .style('text-align','center')
      .style('font-size','20px')
      .style('font-weight','600')
      .style('text-decoration','underline');
      this.pdfPreviewPage1.append('div')
      .text("OFFER REF: TCC/PVT-" + enquiry.number + '/' + customerReference.name + '/' + '110')
      .style('font-size','13px')
      .style('font-weight','600')
      .append('div')
      .text("Date :" + offer.issueDate)
      .style('float','right')
      .style('font-size','13px')
      .style('font-weight','500');
    var customer = this.pdfPreviewPage1.append('div')
    .style('display','flex')
    .style('justify-content','space-between')
    .style('margin-top','20px');
     var customerLeft = customer.append('div');
     var customerRight = customer.append('div');
     customerLeft.append('div')
      .text('M/s ' + offer.customer.name)
      .style('font-size','13px')
      .style('font-weight','600');
     var address = customerLeft.append('div')
      .style('font-size','12px')
      .style("white-space", "pre-line");
      address.node().innerHTML = toAddress;
      var  refAdressing = 'Mr. ';
      if(offer.customer.gender == 'Female') {
        refAdressing = 'Ms. ';
      }
      customerRight.append('div')
      .text(refAdressing + offer.customer.refer)
      .style('font-size','13px')
      .style('font-weight','600');
      customerRight.append('div')
      .text('Ph:' + offer.customer.phone)
      .style('font-size','12px')
      .style('margin-top','2px');
      customerRight.append('div')
      .text('Email:' + offer.customer.email)
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
      .text(offer.subject)
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
      for(let i =0; i < offer.itemsPrice.length; i++) {
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
        .text(offer.itemsPrice[i].description)
        .style('width','40%')
        .style('text-align','center')
        .style('border','solid 1px');
  
        item.append('div')
        .text(offer.itemsPrice[i].unitPrice)
        .style('width','18%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
  
        item.append('div')
        .text(offer.itemsPrice[i].qty)
        .style('width','9%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
        
        item.append('div')
        .text(offer.itemsPrice[i].totalPrice)
        .style('width','22%')
        .style('text-align','center')
        .style('border','solid 1px')
        .style('line-height','32px');
      }
if( offer.subPriceTotalFlag) {
      var items = this.pdfPreviewPage1.append('div')
      .style('display','flex')
      .style('font-weight','600');

      items.append('div')
      .text('TOTAL EX-WORKS PRICE: (' + subTotalPriceWords + ')')       
      .style('width','77%')
      .style('border','solid 1px');

      items.append('div')
      .text(subTotalPrice)
      .style('width','22%')
      .style('text-align','center')
      .style('border','solid 1px')
      .style('line-height','32px');
}
 
      this.pdfPreviewPage1.append('div')
      .style('margin-top', '30px')
      .style('margin-bottom', '10px')
      .text("COMMERCIAL TERMS & CONDITIONS")
      .style('text-align','center')
      .style('font-size','20px')
      .style('font-weight','600')
      .style('text-decoration','underline');
      var nextPage = d3
      .select("#pdf-preview-1")
      .append("div")
      .attr("id", "pdf-preview-start-1-2")
      .style('padding', '20px 70px');
      var item: any;
      for(let i =0; i < offer.terms.length; i++) {
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
        .text(offer.terms[i].lable);

        var content = item.append('div')
        .style('width','54%')
        .style('text-align','center')
        .style('border','solid 1px')
        .append('div')
        .text(offer.terms[i].content);
      if( content.node().getBoundingClientRect().height < 50){
        content.style('padding-top', (50 - content.node().getBoundingClientRect().height)/2 + 'px');
        }
        term.style('padding-top', (content.node().getBoundingClientRect().height - 12)/2 + 'px');
        sno.style('padding-top', (content.node().getBoundingClientRect().height - 16)/2 + 'px');
      
      }
      // console.log((d3.select("#pdf-preview") as any).node().getBoundingClientRect().height);
      // console.log((d3.select("#pdf-preview-start") as any).node().getBoundingClientRect().height);
      // console.log((d3.select("#pdf-preview-header") as any).node().getBoundingClientRect().height);
      this.offerpdfpreview2(enquiry, customerReference, offer);
  }
  offerpdfpreview2(enquiry, customerReference, offer) {
    d3.select("#pdf-preview").style("font-size", "12px");
    this.pdfPreviewPage2 = d3
      .select("#pdf-preview-1")
      .append("div")
      .attr("id", "pdf-preview-start-1")
      .style('padding', '0px 70px');
      this.pdfPreviewPage2.append('div')
      .style('margin-top', '15px')
      .text("* All other terms will be as per our general conditions of sale.");
      this.pdfPreviewPage2.append('div')
      .style('margin-top', '15px')
      .text("We shall be glad to furnish any further information (or) clarifications required by you and await your valued instructions, which will receive our most careful and prompt attention.");
      var reference = this.pdfPreviewPage2.append('div')
      .style('display','flex')
      .style('justify-content','space-between')
      .style('font-size','14px');
      
      var referenceLeft = reference
      .append('div')
      .style('text-align', 'Center')
      .style('margin-top', '20px');

      var referenceRight = reference
      .append('div')
      .style('text-align', 'center')
      .style('margin-top', '15px');

      referenceLeft
      .append('div')
      .text('Thota V')
      .style('margin-top', '10px')
      .style('font-weight','600');
      referenceLeft
      .append('div')
      .text('Cell: ' + '9100920124');
      referenceLeft
      .append('div')
      .text('Ph: ' + offer.officeNumber);
      referenceLeft
      .append('div')
      .text('Email: ')
      .append('span')
      .text('thotav@tccpltd.com')
      .style('color','rgb(22, 58, 154)')
      .style('text-decoration','underline');

      referenceRight
      .append('div')
      .text('With Best Regards')
      .style('font-weight','600');
      referenceRight
      .append('div')
      .text(offer.signBy)
      .style('font-weight','600');
      referenceRight
      .append('div')
      .text(offer.designation);
      referenceRight
      .append('div')
      .text('Cell: ' + offer.authorizedPhoneNumber);
      referenceRight
      .append('div')
      .text('Email: ')
      .append('span')
      .text(offer.email)
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
  size: '98px',
  marginBottom: '3px',
  flag: true
}];
this.solarBusinessPartnerListArrangement(solarBusinessPartnersList, businessPartners, businessPartnersListadd);

// if( (d3.select("#pdf-preview-1") as any).node().getBoundingClientRect().height > ((d3.select("#pdf-preview-start-1") as any).node().getBoundingClientRect().height + (d3.select("#pdf-preview-start-1-2") as any).node().getBoundingClientRect().height + (d3.select("#pdf-preview-header") as any).node().getBoundingClientRect().height + 130)) {    
//       this.pdfPreviewPage2.append('div')
//       .append('img')
//       .attr('src', './assets/logo/Inspected.jpg')
//       .style("width", "100%")
//       .style("margin-top", "35px")
// }
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
   // Offer End
    // Marketing End
    pdfForPreviewFormate(offer) {
      var toAdress = offer.customer.address.replace(/,/g, "," + " &#10;");
      return toAdress;
    }
}
