import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/services/internal/tender/tender.service';

@Component({
  selector: 'app-complete-tender',
  templateUrl: './complete-tender.component.html',
  styleUrls: ['./complete-tender.component.scss']
})
export class CompleteTenderComponent implements OnInit {
items = [];
subTotal: any;
subTotalWithGst: any;
  constructor(public tenderService: TenderService) { }

  ngOnInit() {
    this.subTotal=0;
    this.subTotalWithGst = 0;
    var data= {
      discription: '',
       pricePerItem: 0,
      frieghtCharges: 0,
      otherCharges: 0,
      gst: 0,
      quantity: 0
    };
    for(let i=0; i< this.tenderService.tender.items.length; i++) {
      data.discription =   this.tenderService.tender.items[i].kva + 'KVA' + this.tenderService.tender.items[i].class.hv + '/' +  this.tenderService.tender.items[i].class.lv + '-' + this.tenderService.tender.items[i].discription;
      data.pricePerItem = null;
      data.frieghtCharges = null;
      data.otherCharges = null;
      data.gst = 18;
      data.quantity = this.tenderService.tender.items[i].qty;
      this.items.push({...data});
    }
  }
  addPrice(index) {
    if(this.items[index].pricePerItem) {
      this.items[index].total = (this.items[index].pricePerItem )*this.items[index].quantity;
      this.items[index].totalWithGst = (this.items[index].pricePerItem )*(1+(this.items[index].gst/100))*this.items[index].quantity;
    if(this.items[index].frieghtCharges) {
      
      this.items[index].total = (this.items[index].pricePerItem +this.items[index].frieghtCharges )*this.items[index].quantity;
      this.items[index].totalWithGst = (this.items[index].pricePerItem +this.items[index].frieghtCharges )*(1+(this.items[index].gst/100))*this.items[index].quantity;
if(this.items[index].otherCharges) {
    this.items[index].total = (this.items[index].pricePerItem +this.items[index].frieghtCharges + this.items[index].otherCharges)*this.items[index].quantity;
    this.items[index].totalWithGst = (this.items[index].pricePerItem +this.items[index].frieghtCharges + this.items[index].otherCharges)*(1+(this.items[index].gst/100))*this.items[index].quantity;
}

    }
    }
    this.subTotal=0;
    this.subTotalWithGst = 0;

    for(let i=0; i< this.items.length; i++) {
      if(this.items[i].total && this.items[i].totalWithGst) {
      this.subTotal = this.subTotal + this.items[i].total;
      this.subTotalWithGst = this.subTotalWithGst + this.items[i].totalWithGst;
      }
    }
  }
  submit() {
    this.tenderService.tender.itemsPrice = this.items;
    this.tenderService.tender.itemsTotalPrice =  this.subTotal;
    this.tenderService.tender.status =  'Submitted';
    this.tenderService.tenderSubmission();
  }
  dateFormatting(date) {
    const dates = date.split('/');
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    return dates[0] + ' ' + month[dates[1] - 1] + ' ' + dates[2];
      }

}
