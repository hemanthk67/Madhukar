import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class RoutingService {
  rightTabs: any;
  presentPath: any;
  userData: any;
  loadingFlag = false;
  leftNavData = [];
  routs = {
    tender:{
      title: "Tender",
      role: "admin",
      flag: false,
      subcategories: [
        {
          title: "Tender List",
          path: "Tender/TenderList",
          flag: false
        },
        {
          title: "New Tender Form",
          path: "Tender/NewTender",
          flag: false
        }
        // ,
        // {
        //   title: "Tender Documents",
        //   path: "Tender/TenderDocuments",
        //   flag: false
        // }
      ]
      },
       purchase: {
          title: "Purchase",
          role: "purchase",
          flag: false,
          subcategories: [
            {
              title: "Raise P.O",
              path: "Production/Po",
              flag: false
            }
          ]
        },
   production:{
          title: "Production",
          role: "production",
          flag: false,
          subcategories: [
            {
              title: "Raise P.O",
              path: "Production",
              flag: false
            }
          ]
        },
        marketing:{
               title: "Marketing",
               role: "marketing",
               flag: false,
               subcategories: [ 
                 {
                  title: "Enquiry List",
                  path: "Marketing/EnquiryList",
                  flag: false
                } , 
                {
                  title: "New Enquiry",
                  path: "Marketing/NewEnquiry",
                  flag: false
                }
               ]
             },
        operations:{
              title: "Operation",
              role: "operation",
              flag: false,
              subcategories: [ 
               {
                title: "Employee & Worker",
                path: "Operations/Employees",
                flag: false
              }
              ]
            },
            admin:{
                  title: "Admin",
                  role: "adimin",
                  flag: false,
                  subcategories: [ 
                    {
                     title: "LoginPermissions",
                     path: "Admin/LoginPermissions",
                     flag: false
                   }
                  ]
                }
  };
  constructor(private router: Router) { 
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.rightTabs = null;
        this.routAuth(val.url);
      }
    });
  }
  //Rout Auth
  routAuth(path) {
   var flag = false;
    this.presentPath = path;
    if(this.userData && this.leftNavData) {
    for(let i =0; i < this.leftNavData.length; i++) {
      if(path.includes(this.leftNavData[i].title)) {
        flag = true;
        if(!this.leftNavData[i].flag) {
          this.presentPath = "/Internal";
          this.router.navigate([
            { outlets: { primary: "Internal", approved: null } }
          ]);
        } else {
          this.leftNavData[i].flag = true;
          for (let j = 0; j< this.leftNavData[i].subcategories.length ; j++) {
            
            this.leftNavData[i].subcategories[j].flag = false;
            if (path.includes(this.leftNavData[i].subcategories[j].path)) {
              this.leftNavData[i].flag = true;
              this.leftNavData[i].subcategories[j].flag =true;
            }
          }
        }
      }
    }
    if(path.includes('Auth')) {
      flag = true;
    }
    if(!flag) {
      this.presentPath = "/Internal";
          this.router.navigate([
            { outlets: { primary: "Internal", approved: null } }
          ]);
    }
  }
  }

  // Start of Tender
  tender(path: any) {
    this.loadingFlag = true;
    this.router.navigate([{ outlets: { approved: path } }]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  tenderUploadDocuments() {
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: { approved: "Tender/TenderDocuments" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  tenderResults() {
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: { approved: "Tender/TenderResult" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  tenderList() {
    
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: {  approved: "Tender/TenderList" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  newTender() {
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: {  approved: "Tender/NewTender" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  //Start of Marketing
  enquiryList() {
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: { approved: "Marketing/EnquiryList" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  newEnquiry() {
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: { approved: "Marketing/NewEnquiry" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }

  prepareOffer() {
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: { approved: "Marketing/PrepareOffer" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  marketingEnquiryResults() {
    this.loadingFlag = true;
    this.router.navigate([
      { outlets: { approved: "Marketing/Results" } }
    ]);
    setTimeout(
      function() {
        this.loadingFlag = false;
      }.bind(this),
      500
    );
  }
  //Login
  Login(user, Flag) {
    this.userData = user;
    this.sideNavData();
    if(Flag) {
    this.router.navigate([
      { outlets: { primary: "Internal", approved: null } }
    ]);
  }
  }
sideNavData() {
  
  if (this.userData.role.marketing || this.userData.role.admin) {
    this.leftNavData.push(this.routs.marketing);
   }
  if(this.userData.role) {
//     if (this.userData.role.finance && this.userData.role.admin) {
//       this.routs[2].flag = true;
// this.leftNavData.push(this.routs.finance);
//     } 
   if (this.userData.role.purchase || this.userData.role.admin) {
    this.leftNavData.push(this.routs.purchase);
   }
   if (this.userData.role.tender || this.userData.role.admin) {
    this.leftNavData.push(this.routs.tender);
   }
   if(this.userData.role.admin) {
    this.leftNavData.push(this.routs.admin);
   }
   if (this.userData.role.operation || this.userData.role.admin) {
   this.leftNavData.push(this.routs.operations);
   }
   this.routAuth(this.presentPath);
  }
   }
}
