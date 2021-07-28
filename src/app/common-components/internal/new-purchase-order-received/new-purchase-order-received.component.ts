import { Component, OnInit, Output,
  EventEmitter,
  Input
 } from '@angular/core';

 import { MatIconRegistry } from "@angular/material/icon";
 import { DomSanitizer } from "@angular/platform-browser";
import { PoReceivedService } from 'src/app/services/po-received.service';

@Component({
  selector: 'app-new-purchase-order-received',
  templateUrl: './new-purchase-order-received.component.html',
  styleUrls: ['./new-purchase-order-received.component.scss']
})


export class NewPurchaseOrderReceivedComponent implements OnInit {

  @Output() returnData = new EventEmitter<any>();
  @Output() backFlag = new EventEmitter<boolean>();
  @Input() data;
  @Input() type;
  @Input() firm;

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

  po ={
    poNumber: 0,
    enquiryNumber: 0,
    poMode: 'Private',
    status: 'New',
    workOrderNumber: 0,
    number:0, 
    customer: '',
    items: [],
    itemPrice: [],
    files: {
      technicalDocuments:[],
      customerDocuments: []
    },
    issueDate: '',
    deliveryDate: '',
    deliveryState: 'Telangana',
    deliveryAddress: '',
    firm: '',
    marketingEmployee: '',
    remarks:'',
    warrentyEarly: true,
    warrentyFromSupply: 0,
    warrentyFromCommission: 0
  };
  public flag = {
    organization: true,
    issueDate: true,
    PONumber: true
   };
   calanderFlag = {
    issueDate: false,
  };
  total = 0;
  totalWithGst = 0;
  testFile: FileList;
  allFiles: any;
  editFlag = false;
  editFileRemove: any;
  editFileAdd: any;
  constructor(iconRegistry: MatIconRegistry,
    public poreceivedservice: PoReceivedService,
    sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      "calander",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
    );
    iconRegistry.addSvgIcon(
      "cloud-cross-icon",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/cloud-cross-icon.svg"
      )
    );
    this.po.issueDate = this.presentDate();
  }

  ngOnInit() {
    this.editFlag = false;
    if(this.type == 'marketing') {
    for( let i =0 ; i < this.data.items.length; i++ ) {
      if(this.data.items[i].qty !== 0) {
      this.po.items.push( this.data.items[i]);
      }
    }
    this.po.firm = this.data.firm;
    this.po.enquiryNumber = this.data.number;
    this.po.customer = this.data.customer;
    this.po.marketingEmployee = this.data.employee;
    this.po.itemPrice = this.data.itemPrice;
    this.qtyCheck();
  } else if (this.type == 'marketingEdit') {
    this.po = this.data;
    this.editFlag = true;
    this.allFiles = this.po.files.customerDocuments.slice();
  }
    for(let i =0; i < this.po.itemPrice.length; i++) {
      this.total = this.total + this.po.itemPrice[i].totalPrice;
      this.totalWithGst = this.totalWithGst + this.po.itemPrice[i].totalWithGst;
    }
  }
  calanderOpen(value) {
    this.calanderFlag.issueDate = !this.calanderFlag.issueDate;
  }
  poReturnData () {
    
    this.returnData.emit(this.po);
  }
  presentDate() {
    var today = new Date();
var dd = String(today.getDate());
var mm = String(today.getMonth() + 1); //January is 0!
var yyyy = today.getFullYear();


return( dd + '/' + mm + '/' + yyyy);
  }
  displayCounter(value) {
    if(value) {
      this.calanderFlag.issueDate = false; 
      this.po.issueDate = value;
    } else {
this.calanderFlag.issueDate = false;
    }
  }
  deliveryDateCounter(value) {
    if(value) {
      this.calanderFlag.issueDate = false; 
      this.po.deliveryDate = value;
    } else {
this.calanderFlag.issueDate = false;
    }
  }
  doTextareaValueChange(ev) {
    try {
      this.po.deliveryAddress = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }

  }

  whicheverisearly() {
    this.po.warrentyEarly = !this.po.warrentyEarly;
  }
  submit() {
    if(this.editFlag) {
      this.po = this.poreceivedservice.uploadFile(this.editFileAdd,this.po, this.editFlag);
      for( let j=0; j < this.poreceivedservice.originalPos.length; j++)
      {
        if(this.poreceivedservice.originalPos[j].number == this.po.number) {
          this.poreceivedservice.originalPos[j] = {...this.po};

          this.poreceivedservice.pos[j]= {...this.po};
           this.poreceivedservice.pos[j].issueDateFormatted = this.poreceivedservice.dateFormatting(this.po.issueDate);    
        this.poreceivedservice.pos[j].deliveryDateFormatted = this.poreceivedservice.dateFormatting(this.po.deliveryDate);
        this.poreceivedservice.pos[j].flag = true;
        this.poreceivedservice.pos[j].totalPrice = 0;
        for(let k=0; k < this.poreceivedservice.pos[j].itemPrice.length; k++) {
          this.poreceivedservice.pos[j].totalPrice = this.poreceivedservice.pos[j].totalPrice + this.poreceivedservice.pos[j].itemPrice[k].totalPrice; 
        }
        this.poreceivedservice.pos[j].totalPriceGst = this.poreceivedservice.pos[j].totalPrice + (this.poreceivedservice.pos[j].totalPrice * 0.18);
          
        }
      }
    } else {
      this.po = this.poreceivedservice.uploadFile(this.allFiles,this.po, this.editFlag); 
    } 
    this.poreceivedservice.setPoData(this.po);
    this.returnData.emit(this.po);
  }
  qtyCheck()
  {
    for(let i =0; i < this.po.itemPrice.length; i++) {
      if(this.po.itemPrice[i].qty == 0) {
        this.po.itemPrice.splice(i,1);
        this.po.items.splice(i,1);
        this.qtyCheck();
        break;
      }
    }
  }

  addPrice(i) {
    if(this.po.itemPrice[i].unitPrice) {
      this.po.itemPrice[i].totalPrice = (this.po.itemPrice[i].unitPrice)*this.po.itemPrice[i].qty;
      this.po.itemPrice[i].totalWithGst = (this.po.itemPrice[i].totalPrice )*(1+(this.po.itemPrice[i].gst/100));
    }
    this.total =0;
    for(let j =0; j< this.po.itemPrice.length; j++) {
      this.total = this.total + this.po.itemPrice[j].totalPrice;
    }
    this.totalWithGst = this.total + this.total*(this.po.itemPrice[0].gst/100);
  }

  // ADDING AND REMOVING FILES
  detectFile(event) {
    
    this.testFile = event.target.files;
    console.log(this.testFile);
    if (this.allFiles) {
      for (let i = 0; i < this.testFile.length; i++) {
        this.allFiles[this.allFiles.length] = this.testFile[i];
    if(this.editFlag) { 
      if(this.editFileAdd) { 
      this.editFileAdd[this.editFileAdd.length] = this.testFile[i];
      } else {
        this.editFileAdd = [];
      this.editFileAdd.push(this.testFile[i]);
    }
    }
 }
    } else {
      this.allFiles = Array.from(this.testFile);
      if(this.editFlag) {     
        if(this.editFileAdd) {    
      for (let i = 0; i < this.testFile.length; i++) {
        this.editFileAdd[this.editFileAdd.length] = this.testFile[i];
      }
        } else {
        this.editFileAdd = Array.from(this.testFile);
      }
    }
  }
  }
  deleteFile(value: any) {
    var editFile = true;
    if (this.editFlag) {
      if(this.editFileAdd) {
      for (let i =0; i < this.editFileAdd.length; i++) {
        if(this.editFileAdd[i].name == this.allFiles[value].name) {
          this.editFileAdd.splice(i, 1);
          editFile = false;
        }
      }
    }
      if(editFile) {
this.editFileRemove = this.allFiles[value];
      } else {
    this.allFiles.splice(value, 1);
      }
      
    } else {
    this.allFiles.splice(value, 1);
    }
  }
}
