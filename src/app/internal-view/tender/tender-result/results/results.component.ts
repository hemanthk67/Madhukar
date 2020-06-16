import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/services/internal/tender/tender.service';
import { InfoService } from 'src/app/services/internal/info.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
result = [
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
rejectionReason = [
  'Vendor Registration',
  'Test Certificates',
  'Make Approval',
  'Experiance',
  'Others'
];
tenderRejectedReason = '';
resultStatus = '';
resultStatusRemark = '';
competitorDetails: any;
newCompetitorDetails = {
  name: '',
  loacationByState: '',
  brand:''
};
newMakeDetails = {
  name: '',
  brand: ''
}
addCompetitorFlag= {
  name: true,
  loacationByState: true,
  brand: true
};
newMakeDetailsFlag = {
  name: true,
  brand: true
}
addnewMakeFlag = false;
newCompetitorName = '';
indianStates = ['Andhra Pradesh',
'Andaman and Nicobar',
 'Arunachal Pradesh' ,
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Daman and Diu',
  'Dadar and Nagar Haveli',
  'Delhi',
   'Goa',
   'Gujarat',
   'Haryana',
   'Himachal Pradesh',
   'Jammu and Kashmir',
   'Jharkhand',
   'Karnataka',
   ' Kerala',
   'Ladakh',
   'Lakshadweep',
   ' Madhya Pradesh',
   ' Maharashtra',
   ' Manipur',
   ' Meghalaya',
   'Mizoram',
   'Nagaland',
   'Odisha',
   'Puducherry',
   'Punjab',
   'Rajasthan',
   'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'];

addCompetitorDetailsFlag = false;
public comparitiveItemsPrice = [];
  constructor(public tenderService: TenderService,
    public infoService: InfoService
    ) { }

  ngOnInit() {
    this.competitorDetails = this.infoService.competitorDetails;
    var items= [];
    var data= {
      discription: '',
       pricePerItem: 0,
      frieghtCharges: 0,
      otherCharges: 0,
      gst: 0,
      quantity: 0,
      totalWithGst:0,
      total:0
    };
    this.comparitiveItemsPrice[0] = {
      name: 'TCC ENERGY SOLUTIONS',
      data: null,
      total: 0,
      totalWithGst: 0
    };
    for(let i=0; i< this.tenderService.tender.itemsPrice.length; i++) {
      data.discription =   this.tenderService.tender.itemsPrice[i].discription;
      data.pricePerItem = this.tenderService.tender.itemsPrice[i].pricePerItem;
      data.frieghtCharges = this.tenderService.tender.itemsPrice[i].frieghtCharges;
      data.otherCharges = this.tenderService.tender.itemsPrice[i].otherCharges;
      data.gst = this.tenderService.tender.itemsPrice[i].gst;
      data.quantity = this.tenderService.tender.itemsPrice[i].quantity;
      data.total = this.tenderService.tender.itemsPrice[i].total;
      data.totalWithGst = this.tenderService.tender.itemsPrice[i].totalWithGst;
      this.comparitiveItemsPrice[0].total = this.comparitiveItemsPrice[0].total + data.total;
      this.comparitiveItemsPrice[0].totalWithGst = this.comparitiveItemsPrice[0].totalWithGst + data.totalWithGst;
      items.push({...data});
    }
    this.comparitiveItemsPrice[0].data =  items;
  }
  tenderStatus(status) {
this.resultStatus = status;
  }
  doTextareaValueChange(ev) {
    try {
      this.resultStatusRemark = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }

  }
  removeCompetitor(index) {
    this.comparitiveItemsPrice.splice(index, 1);
  }
  addCompetitortoList() {
    var items= [];
    var data= {
      discription: '',
       pricePerItem: 0,
      frieghtCharges: 0,
      otherCharges: 0,
      gst: 0,
      quantity: 0,
      totalWithGst:0,
      total:0
    };
    var comparitiveItemsPriceData = {
      name: this.newCompetitorName,
      total:0,
      totalWithGst:0,
      data:[]
    }
    const comparitiveItemsPriceIndex = this.comparitiveItemsPrice.length;
    for(let i=0; i< this.tenderService.tender.items.length; i++) {
      data.discription =   this.tenderService.tender.itemsPrice[i].discription;
      data.pricePerItem = 0;
      data.frieghtCharges = 0;
      data.otherCharges = 0;
      data.gst = this.tenderService.tender.itemsPrice[i].gst;
      data.quantity = this.tenderService.tender.itemsPrice[i].quantity;
      data.total = 0;
      data.totalWithGst = 0;
      comparitiveItemsPriceData.total = 0;
      comparitiveItemsPriceData.totalWithGst = 0;
      items.push({...data});
    }
    comparitiveItemsPriceData.data =  items;
    this.comparitiveItemsPrice.push(comparitiveItemsPriceData);
    for( let x=0; x< this.competitorDetails.length; x++) {
      if(this.competitorDetails[x].name === this.newCompetitorName) {
      this.competitorDetails.splice(x,1);
    }
    }
  }
  addCompetitorDetails() {
    this.addCompetitorDetailsFlag = !this.addCompetitorDetailsFlag;
  }
  addBrand() {
    this.addnewMakeFlag = !this.addnewMakeFlag;
  }
  addCompetitor() {
if(this.newCompetitorDetails.name != '') {
  this.addCompetitorFlag.name = true;
if(this.newCompetitorDetails.loacationByState != '') {
  this.addCompetitorFlag.loacationByState = true;
  if(!this.addnewMakeFlag) {
    if(this.newCompetitorDetails.brand != '') {
      this.addCompetitorFlag.brand = true;
  this.infoService.addCompetitorDetails(this.newCompetitorDetails, this.newMakeDetails , this.addnewMakeFlag);
  this.newCompetitorDetails.name = '';
  this.newCompetitorDetails.loacationByState = '';
  this.newCompetitorDetails.brand = '';
  this.newMakeDetails.name = '';
  this.newMakeDetails.brand = '';
  this.addCompetitorDetailsFlag = !this.addCompetitorDetailsFlag;
    } else {
      this.addCompetitorFlag.brand = false;
    }
  } else {
    if(this.newMakeDetails.name) {
      this.newMakeDetailsFlag.name = true;
      if(this.newMakeDetails.brand) {
        this.newMakeDetailsFlag.brand = true;
        this.newCompetitorDetails.brand = this.newMakeDetails.brand;
          this.infoService.addCompetitorDetails(this.newCompetitorDetails, this.newMakeDetails , this.addnewMakeFlag);
          this.newCompetitorDetails.name = '';
          this.newCompetitorDetails.loacationByState = '';
          this.newCompetitorDetails.brand = '';
          this.newMakeDetails.name = '';
          this.newMakeDetails.brand = '';
  this.addCompetitorDetailsFlag = !this.addCompetitorDetailsFlag;
      } else {
        this.newMakeDetailsFlag.brand = false;
      }
    } else {
      this.newMakeDetailsFlag.name = false;
    }
  }
} else {
  this.addCompetitorFlag.loacationByState = false;
}
}  else {
  this.addCompetitorFlag.name = false;
}
  }

  addPrice(i,j) {
    this.comparitiveItemsPrice[j].data[i].total = 0;
    this.comparitiveItemsPrice[j].data[i].totalWithGst = 0;

    if(this.comparitiveItemsPrice[j].data[i].pricePerItem) {
      this.comparitiveItemsPrice[j].data[i].total =this.comparitiveItemsPrice[j].data[i].total + (this.comparitiveItemsPrice[j].data[i].pricePerItem )*this.comparitiveItemsPrice[j].data[i].quantity;
      this.comparitiveItemsPrice[j].data[i].totalWithGst = this.comparitiveItemsPrice[j].data[i].totalWithGst + (this.comparitiveItemsPrice[j].data[i].pricePerItem )*(1+(this.comparitiveItemsPrice[j].data[i].gst/100))*this.comparitiveItemsPrice[j].data[i].quantity;
    }
    if(this.comparitiveItemsPrice[j].data[i].frieghtCharges) {
      
      this.comparitiveItemsPrice[j].data[i].total = this.comparitiveItemsPrice[j].data[i].total + (this.comparitiveItemsPrice[j].data[i].frieghtCharges )*this.comparitiveItemsPrice[j].data[i].quantity;
      this.comparitiveItemsPrice[j].data[i].totalWithGst = this.comparitiveItemsPrice[j].data[i].totalWithGst + (this.comparitiveItemsPrice[j].data[i].frieghtCharges )*(1+(this.comparitiveItemsPrice[j].data[i].gst/100))*this.comparitiveItemsPrice[j].data[i].quantity;
    }
    if(this.comparitiveItemsPrice[j].data[i].otherCharges) {
     this.comparitiveItemsPrice[j].data[i].total = this.comparitiveItemsPrice[j].data[i].total + (this.comparitiveItemsPrice[j].data[i].otherCharges)*this.comparitiveItemsPrice[j].data[i].quantity;
      this.comparitiveItemsPrice[j].data[i].totalWithGst = this.comparitiveItemsPrice[j].data[i].totalWithGst +  (this.comparitiveItemsPrice[j].data[i].otherCharges)*(1+(this.comparitiveItemsPrice[j].data[i].gst/100))*this.comparitiveItemsPrice[j].data[i].quantity;
    }

    this.comparitiveItemsPrice[j].total=0;
    this.comparitiveItemsPrice[j].totalWithGst = 0;

    for(let k=0; k< this.comparitiveItemsPrice[j].data.length; k++) {
      if(this.comparitiveItemsPrice[j].data[k].total && this.comparitiveItemsPrice[j].data[k].totalWithGst) {
      this.comparitiveItemsPrice[j].total = this.comparitiveItemsPrice[j].total + this.comparitiveItemsPrice[j].data[k].total;
      this.comparitiveItemsPrice[j].totalWithGst = this.comparitiveItemsPrice[j].total + this.comparitiveItemsPrice[j].data[k].totalWithGst;
      }
    }
  }
  submit() {
    if(this.resultStatus == ''){
alert('Please Select tender status');
    } else {
    this.tenderService.tender.status = this.resultStatus;
    this.tenderService.tender.rejectedReason = this.tenderRejectedReason;
    this.tenderService.tender.statusRemark = this.resultStatusRemark;
    this.tenderService.tender.comparitivePrice = this.comparitiveItemsPrice;
    this.tenderService.tenderResultSubmission(this.tenderService.tender);
    }
  }
}
