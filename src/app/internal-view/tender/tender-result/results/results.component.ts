import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/services/internal/tender/tender.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
private result = [
{
  name:'Successful',
  message:'The Tender has been alloted to us',
  color:'green'
},
{
  name:'UnSuccessful',
  message:'The Tender has been alloted to other competitor',
  color:'red'
},
{
  name:'Rejected',
  message:'TCC is not Allowed to partcipate in the tender',
  color:'red'
},
{
  name:'Cancelled',
  message:'The Tender has been cancelled',
  color:'blue'
}
];
public items = [];
public comparitiveItemsPrice = [];
  constructor(public tenderService: TenderService) { }

  ngOnInit() {
    var data= {
      discription: '',
       pricePerItem: 0,
      frieghtCharges: 0,
      otherCharges: 0,
      gst: 0,
      quantity: 0
    };
    for(let i=0; i< this.tenderService.tender.itemsPrice.length; i++) {
      data.discription =   this.tenderService.tender.itemsPrice[i].discription;
      data.pricePerItem = this.tenderService.tender.itemsPrice[i].pricePerItem;
      data.frieghtCharges = this.tenderService.tender.itemsPrice[i].frieghtCharges;
      data.otherCharges = this.tenderService.tender.itemsPrice[i].otherCharges;
      data.gst = this.tenderService.tender.itemsPrice[i].gst;
      data.quantity = this.tenderService.tender.itemsPrice[i].quantity;
      this.items.push({...data});
    }
    this.comparitiveItemsPrice.push({
      name: 'TCC ENERGY SOLUTIONS',
      data: {...this.items}
    });
  }

  test() {
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

}
