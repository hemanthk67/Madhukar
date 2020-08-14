import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { RoutingService } from 'src/app/services/routing.service';
import { InfoService } from 'src/app/services/internal/info.service';
import { MarketingService } from 'src/app/services/internal/marketing/marketing.service';

@Component({
  selector: 'app-new-enquiry',
  templateUrl: './new-enquiry.component.html',
  styleUrls: ['./new-enquiry.component.scss']
})
export class NewEnquiryComponent implements OnInit {
  testFile: FileList;
  allFiles: any;
  enquiry :any;
  editFileRemove: any;
  editFileAdd: any;
newOrganizationName = {
  fullName: '',
  name: '',
  details: [
    {
      address: '',
      name:'',
      email:'',
      phone:'',
      gender: 'Male'
    }
  ]
};
addOrganizationFlag= {
  fullName: true,
  name: true
};
  calanderFlag = {
    issueDate: false,
  };
  public flag = {
    organization: true,
    issueDate: true,
   };
   items = [
    {description:'',
  rating: '',
  classHv: '',
  classLv:'',
  type:'',
  standard:'',
  tapVariation:'',
  terminalHv:'',
  terminalLv:'',
qty:1,
remark:''}
  ];
  editFlag = false;
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public routingService: RoutingService,
    public infoService:InfoService,
    public marketingService:MarketingService) { 
      iconRegistry.addSvgIcon(
        "calander",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/calander.svg")
      );
      iconRegistry.addSvgIcon(
        "pdf-icon",
        sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pdf-icon.svg")
      );
      iconRegistry.addSvgIcon(
        "cloud-cross-icon",
        sanitizer.bypassSecurityTrustResourceUrl(
          "assets/icons/cloud-cross-icon.svg"
        )
      );
    }

  ngOnInit() {
    this.RightTab();
    this.editFlag = false;
    if (this.marketingService.editFlag) {
      this.editFlag = true;
      this.enquiry = this.marketingService.enquiry;
      this.items = this.enquiry.items;
      this.allFiles = this.enquiry.files.enquiryDocuments.slice();
    } else {
      this.enquiry = this.marketingService.newEnquiry;
    }
    this.marketingService.editFlag = false;
  }
  submit() {
    if(this.editFlag) {
      this.marketingService.pushEnquiryData(this.enquiry,this.editFileAdd,this.editFlag);

    } else {
      this.marketingService.pushEnquiryData(this.enquiry,this.allFiles,this.editFlag);
    }
    this.routingService.enquiryList();
  }
  addItem() {
    var item = {descrition:'',
    rating: '',
    classHv: this.enquiry.items[this.enquiry.items.length -1].classHv,
    classLv:this.enquiry.items[this.enquiry.items.length -1].classLv,
    type:this.enquiry.items[this.enquiry.items.length -1].type,
    standard:this.enquiry.items[this.enquiry.items.length -1].standard,
    tapVariation:this.enquiry.items[this.enquiry.items.length -1].tapVariation,
    terminalHv:this.enquiry.items[this.enquiry.items.length -1].terminalHv,
    terminalLv:this.enquiry.items[this.enquiry.items.length -1].terminalLv,
  qty:1,
  remark:''};
this.enquiry.items.push(item);
  }
  removeItem(index) {
    this.enquiry.items.splice(index,1);
  }
  calanderOpen(value) {
    this.calanderFlag.issueDate = !this.calanderFlag.issueDate;
  }
  displayCounter(value) {
    if(value) {
      this.calanderFlag.issueDate = false; 
      this.enquiry.issueDate = value;
    } else {
this.calanderFlag.issueDate = false;
    }
  }

  // 
  creatediscription(index) {
    this.enquiry.items[index].description = this.enquiry.items[index].rating + 'KVA, ' + this.enquiry.items[index].classHv + '/' + this.enquiry.items[index].classLv + 'KV, IS:' + this.enquiry.items[index].standard + '.';
  }

  RightTab() {
    this.routingService.rightTabs = [{name:'Add Customer',
    message: 'Add New Customer/Organization to our data for future use',
  flag: false }
  ];
  }
  addOrganizationBack() {
    this.routingService.rightTabs[0].flag = !this.routingService.rightTabs[0].flag;
  }
  addOrganization() {
    if(this.newOrganizationName.fullName != '') {
      this.addOrganizationFlag.fullName = true;
    if(this.newOrganizationName.name != '') {
      if(this.newOrganizationName.details[0].name != ''){
      this.infoService.addPvtCustomerName(this.newOrganizationName);
      this.newOrganizationName.fullName = '';
      this.newOrganizationName.name = '';
      this.newOrganizationName.details[0].name = '';
      this.newOrganizationName.details[0].address = '';
      this.newOrganizationName.details[0].email = '';
      this.newOrganizationName.details[0].phone = '';
      this.routingService.rightTabs[0].flag = !this.routingService.rightTabs[0].flag;
      }
    } else {
      this.addOrganizationFlag.name = false;
    }
    }  else {
      this.addOrganizationFlag.fullName = false;
    }
      }


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
