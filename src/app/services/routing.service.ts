import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class RoutingService {
  presentPath: any;
  userData: any;
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
        },
        {
          title: "Tender Documents",
          path: "Tender/TenderDocuments",
          flag: false
        }]
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
        }
  };
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.routAuth(val.url);
      }
    });
  }
  routAuth(path) {
    this.presentPath = path;
    if(this.userData && this.leftNavData) {
    for(let i =0; i < this.leftNavData.length; i++) {
      if(path.includes(this.leftNavData[i].title)) {
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
  }
  }
  tender(path: any) {
    this.router.navigate([{ outlets: { approved: path } }]);
  }
  tenderUploadDocuments() {
    this.router.navigate([
      { outlets: { primary: "Internal", approved: "Tender/TenderDocuments" } }
    ]);
  }
  tenderList() {
    this.router.navigate([
      { outlets: { primary: "Internal", approved: "Tender/TenderList" } }
    ]);
  }

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
  if(this.userData.role) {
//     if (this.userData.role.finance && this.userData.role.admin) {
//       this.routs[2].flag = true;
// this.leftNavData.push(this.routs.finance);
//     } 
   if (this.userData.role.purchase || this.userData.role.admin) {
    // this.routs[2].flag = true;
    this.leftNavData.push(this.routs.production);
   }
   if (this.userData.role.tender || this.userData.role.admin) {
    // this.routs[0].flag = true;
    this.leftNavData.push(this.routs.tender);
   }
   this.routAuth(this.presentPath);
  }
   }
}
