import { Component, OnInit, Output,
  EventEmitter,
  Input
 } from '@angular/core';

 import { MatIconRegistry } from "@angular/material/icon";
 import { DomSanitizer } from "@angular/platform-browser";
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

  po ={
    number: 0,
    customer: '',
    items: [],
    files: {
      technicalDocuments:[],
      customerDocuments: []
    },
    issueDate: '',
    firm: '',
    marketingEmployee: '',
    remarks:''
  };
  public flag = {
    organization: true,
    issueDate: true,
   };
   calanderFlag = {
    issueDate: false,
  };
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      "calander",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
    );
    this.po.issueDate = this.presentDate();
  }

  ngOnInit() {
    this.po.items = this.data.items;
    this.po.firm = this.data.firm;
    this.po.customer = this.data.customer;
    this.po.marketingEmployee = this.data.employee;
    console.log(this.data);
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
      // this.enquiry.issueDate = value;
    } else {
this.calanderFlag.issueDate = false;
    }
  }
}
