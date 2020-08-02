import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { RoutingService } from 'src/app/services/routing.service';
import { InfoService } from 'src/app/services/internal/info.service';

@Component({
  selector: 'app-new-enquiry',
  templateUrl: './new-enquiry.component.html',
  styleUrls: ['./new-enquiry.component.scss']
})
export class NewEnquiryComponent implements OnInit {
  testFile: FileList;
  allFiles: any;
  enquiry = {
    customer:'',
  issueDate:'',
  specialFeatures:'',
  items:[
    {descrition:'',
  rating: 1000,
  classHv: '',
  classLv:'',
  type:'',
  standard:'',
  tapVariation:'',
  terminalHv:'',
  terminalLv:'',
qty:1,
remark:''}
  ]
};
newOrganizationName = {
  fullName: '',
  name: '',
  details: [
    {
      address: '',
      name:'',
      email:'',
      phone:''
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
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public routingService: RoutingService,
    public infoService:InfoService) { 
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
  }
  submit() {
   console.log(this.enquiry);
  }
  addItem() {
    var item = {descrition:'',
    rating: 1000,
    classHv: '',
    classLv:'',
    type:'',
    standard:'',
    tapVariation:'',
    terminalHv:'',
    terminalLv:'',
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
  specialFeatureText(ev) {
    try {
      this.enquiry.specialFeatures = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }

  }
  itemDescriptionText(ev,index) {
    try {
      this.enquiry.items[index].descrition = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }

  }
  itemRemarkText(ev,index) {
    try {
      this.enquiry.items[index].remark = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }

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
      newCustomerAddressText(ev) {
        try {
          this.newOrganizationName.details[0].address = ev.target.value;
        } catch(e) {
          console.info('could not set textarea-value');
        }
    
      }

      detectFile(event) {
    
        this.testFile = event.target.files;
        console.log(this.testFile);
        if (this.allFiles) {
          for (let i = 0; i < this.testFile.length; i++) {
            this.allFiles[this.allFiles.length] = this.testFile[i];
        // if(this.tenderService.editFlag) { 
        //   if(this.editFileAdd) { 
        //   this.editFileAdd[this.editFileAdd.length] = this.testFile[i];
        //   } else {
        //     this.editFileAdd = [];
        //   this.editFileAdd.push(this.testFile[i]);
        // }
        // }
     }
        } else {
          this.allFiles = Array.from(this.testFile);
        //   if(this.tenderService.editFlag) {     
        //     if(this.editFileAdd) {    
        //   for (let i = 0; i < this.testFile.length; i++) {
        //     this.editFileAdd[this.editFileAdd.length] = this.testFile[i];
        //   }
        //     } else {
        //     this.editFileAdd = Array.from(this.testFile);
        //   }
        // }
      }
      }
      deleteFile(value: any) {
        var editFile = true;
    //     if (this.tenderService.editFlag) {
    //       if(this.editFileAdd) {
    //       for (let i =0; i < this.editFileAdd.length; i++) {
    //         if(this.editFileAdd[i].name == this.allFiles[value].name) {
    //           this.editFileAdd.splice(i, 1);
    //           editFile = false;
    //         }
    //       }
    //     }
    //       if(editFile) {
    // this.editFileRemove = this.allFiles[value];
    //       } else {
    //     this.allFiles.splice(value, 1);
    //       }
          
    //     } else {
        this.allFiles.splice(value, 1);
        // }
      }
}
