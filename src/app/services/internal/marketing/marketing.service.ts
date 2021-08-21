import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";

import { pdfFileService } from "../../pdfFile.service";
import { InfoService } from "../../../services/internal/info.service";
import { RoutingService } from "../../routing.service";
import { environment } from "src/environments/environment";

import { map, take } from "rxjs/operators";

class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}

@Injectable({
  providedIn: "root",
})
export class MarketingService {
  public editFlag = false;
  public editOfferFlag = false;
  public newEnquiry = {
    number: null,
    employee: "",
    customer: "",
    issueDate: "",
    status: "New Enquiry",
    specialFeatures: "",
    firm: "TCC ENERGY SOLUTIONS",
    items: [
      {
        description: "",
        rating: "",
        classHv: "11",
        classLv: "0.433",
        type: "ONAN",
        standard: "",
        tapVariation: "OCTC",
        terminalHv: "Bare Bushings",
        terminalLv: "Cable Box",
        qty: 1,
        remark: "",
      },
    ],
    files: {
      enquiryDocuments: [],
      preparedDocuments: [],
    },
    itemPrice: [],
  };
  public enquiry;
  public data;
  public originalData = [];
  public currentEnquiryNo = 0;
  private pathBase = environment.marketingPath; // change to enquiry once done with testing and ready for production
  nextEnquiryNo = 0;
  searchByCustomerData = [];
  searchByCustomerOriginalData = [];
  searchByCustomerDataFlag = false;
  limitToGetMarketingData = 20;
  // private pathBase = 'Marketing';
  // private pathBase = 'testMarketing';
  constructor(
    private afs: AngularFirestore,
    public pdfService: pdfFileService,
    public infoService: InfoService,
    private routingService: RoutingService
  ) {
    this.getMarkers().then((data) => {
      // this.data = data.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
      // if( this.nextEnquiryNo == 0) {
      this.data = data;
      this.nextEnquiryNo = data[0].number - this.limitToGetMarketingData;
      // } else {
      //   this.data.concat(data);
      // }
      // this.originalData = this.originalData.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
    });
  }
  // function to et data from the DB
  async getMarkers() {
    var markers = [];
    //   if(!this.data) {
    //   await firebase.firestore().collection(this.pathBase).get()
    //     .then(querySnapshot => {
    //       querySnapshot.docs.forEach(doc => {
    //         if(doc.data().number > this.currentEnquiryNo) {
    //           this.currentEnquiryNo = doc.data().number;
    //         }
    //       this.originalData.push(doc.data());
    //       markers.push(doc.data());
    //       markers[markers.length - 1].issueDateFormatted = this.dateFormatting(doc.data().issueDate);
    //       markers[markers.length - 1].flag = true;
    //     });
    //   });
    // } else {
    //   markers = this.data;
    // }
    try {
      if (this.nextEnquiryNo == 0) {
        markers = await this.afs
          .collection(this.pathBase, (query) =>
            query.orderBy("number", "desc").limit(this.limitToGetMarketingData)
          )
          .valueChanges()
          .pipe(take(1))
          .toPromise();
      } else if (this.nextEnquiryNo > 1001) {
        markers = await this.afs
          .collection(this.pathBase, (query) =>
            query
              .orderBy("number", "desc")
              .startAt(this.nextEnquiryNo)
              .limit(this.limitToGetMarketingData)
          )
          .valueChanges()
          .pipe(take(1))
          .toPromise();
      }
    } catch (error) {
      console.error(
        "There was a problem fetching purchase orders ! : " + error
      );
    }
    if (this.nextEnquiryNo == 0) {
      this.originalData = JSON.parse(JSON.stringify(markers));
      this.currentEnquiryNo = markers[0].number;
    } else if (this.nextEnquiryNo > 1001) {
      this.originalData = this.originalData.concat(
        JSON.parse(JSON.stringify(markers))
      );
      this.nextEnquiryNo = markers[0].number - this.limitToGetMarketingData;
    }
    for (let i = 0; i < markers.length; i++) {
      markers[i].issueDateFormatted = this.dateFormatting(markers[i].issueDate);
      markers[i].flag = true;
    }
    return markers;
  }
  async searchByCustomerGetData(customerSearch) {
    var markers = [];
    try {
      markers = await this.afs
        .collection(this.pathBase, (query) =>
          query
            .orderBy("number", "desc")
            .where("customer", "==", customerSearch)
        )
        .valueChanges()
        .pipe(take(1))
        .toPromise();
    } catch (error) {
      console.error(
        "There was a problem fetching purchase orders ! : " + error
      );
    }
    this.searchByCustomerOriginalData = JSON.parse(JSON.stringify(markers));
    for (let i = 0; i < markers.length; i++) {
      markers[i].issueDateFormatted = this.dateFormatting(markers[i].issueDate);
      markers[i].flag = true;
    }
    return markers;
  }
  // function to push new enquiry data
  pushEnquiryData(enquiryData, files, editFlag) {
    if (editFlag) {
      enquiryData = this.uploadFile(
        files,
        enquiryData,
        "enquiry-documents",
        editFlag
      );
      this.setEnquiryData(enquiryData);
      // adding data back to the original data and normal data
      if (!this.searchByCustomerDataFlag) {
        for (let j = 0; j < this.originalData.length; j++) {
          if (this.originalData[j].number == enquiryData.number) {
            this.originalData[j] = { ...enquiryData };
            enquiryData.issueDateFormatted = this.dateFormatting(
              enquiryData.issueDate
            );
            enquiryData.flag = true;
            this.data[j] = { ...enquiryData };
          }
        }
      }
    } else {
      enquiryData.number = this.currentEnquiryNo + 1;
      enquiryData = this.uploadFile(
        files,
        enquiryData,
        "enquiry-documents",
        editFlag
      );
      this.setEnquiryData(enquiryData);
      this.currentEnquiryNo = enquiryData.number;
      this.originalData.splice(0, 0, JSON.parse(JSON.stringify(enquiryData))); //
      enquiryData.issueDateFormatted = this.dateFormatting(
        enquiryData.issueDate
      );
      enquiryData.flag = true;
      this.data.splice(0, 0, { ...enquiryData });
    }
  }
  // common files upload function
  public uploadFile(allFiles, enquiry, type, editFlag) {
    if (allFiles) {
      for (let i = 0; i < allFiles.length; i++) {
        let file = allFiles[i];
        const enquiryFile = {
          name: null,
          path: null,
        };
        const currentFile = new Upload(file);
        enquiryFile.name = file.name;
        if (type == "enquiry-documents") {
          enquiryFile.path =
            this.pathBase + "/" + enquiry.number + "/" + file.name;
          if (editFlag) {
            enquiry.files.enquiryDocuments[
              enquiry.files.enquiryDocuments.length
            ] = { ...enquiryFile };
          } else {
            enquiry.files.enquiryDocuments.push({ ...enquiryFile });
          }
        }
        this.pdfService.pushUpload(currentFile, enquiryFile.path);
      }
    }
    return enquiry;
  }
  //set offer data
  setOfferData() {
    // adding data back to the original data and normal data
    if (!this.searchByCustomerDataFlag) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].number == this.enquiry.number) {
          this.data[i] = JSON.parse(JSON.stringify(this.enquiry));
          this.data[i].issueDateFormatted = this.dateFormatting(
            this.data[i].issueDate
          );
        }
        if (this.originalData[i].number == this.enquiry.number) {
          this.originalData[i] = JSON.parse(JSON.stringify(this.enquiry));
        }
      }
    }
    this.setEnquiryData(this.enquiry);
  }

  enquiryResultSubmission(data) {
    this.setEnquiryData(data);
    // adding data back to the original data and normal data
    if (!this.searchByCustomerDataFlag) {
      for (let i = 0; i < this.originalData.length; i++) {
        if (this.originalData[i].number == data.number) {
          this.data[i].status = this.originalData[i].status = data.status;
          this.data[i].rejectedReason = this.originalData[i].rejectedReason =
            data.rejectedReason;
          this.data[i].statusRemark = this.originalData[i].statusRemark =
            data.statusRemark;
          break;
        }
      }
    }
    this.routingService.enquiryList();
  }
  // function to set upload new data
  setEnquiryData(data) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/${data.number}`
    );
    newUserRef.set(data, { merge: true });
    this.searchByCustomerDataFlag = false;
  }

  //Date Formating got the teder list page
  dateFormatting(date) {
    const dates = date.split("/");
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return dates[0] + " " + month[dates[1] - 1] + " " + dates[2];
  }
}
