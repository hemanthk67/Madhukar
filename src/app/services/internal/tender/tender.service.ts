import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { pdfFileService } from '../../pdfFile.service';

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
  providedIn: 'root'
})
export class TenderService {
  public tender = {
    TenderNo: null,
    organization: "",
    tenderMode: "online",
    tenderNumber: "",
    eTenderNumber: "",
    issueDate: "",
    startDate: "",
    dueDate: "",
    status:"New Tender",
    emd: {
      exemption: true,
      percentage: true,
      amount: "12"
    },
    transactionFee: {
      exemption: true,
      percentage: true,
      amount: "122"
    },
    documentCost: {
      exemption: true,
      percentage: true,
      amount: "123"
    },
    items: [],
    files: {
      tenderDocuments:[],
uploadedDocuments:[]
    }
  };
public data;
public originalData = [];
public currentTenderNo = 0;

private pathBase = 'test';  // change to Tender once done with testing and ready for production
  constructor(
    private afs: AngularFirestore,
    public pdfService: pdfFileService) {
    this.getMarkers().then(data => {
      this.data = data;
    });
   }
  async getMarkers() {
    var markers = [];
    if(!this.data) {
    await firebase.firestore().collection(this.pathBase).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if(doc.data().TenderNo > this.currentTenderNo) {
            this.currentTenderNo = doc.data().TenderNo;
          }
        this.originalData.push(doc.data());
        markers.push(doc.data());
        markers[markers.length - 1].startDateFormatted = this.dateFormatting(doc.data().startDate);
        markers[markers.length - 1].dueDateFormatted = this.dateFormatting(doc.data().dueDate);
        markers[markers.length - 1].issueDateFormatted = this.dateFormatting(doc.data().issueDate);
        markers[markers.length - 1].flag = true;
      });
    });
  } else {
    markers = this.data;
  }
    return markers;
  }
  pushTenderData(data, files) {
    data.TenderNo = this.currentTenderNo + 1;
    data = this.uploadFile(files ,data);
  this.setTenderData(data);
    this.currentTenderNo = data.TenderNo;
    this.originalData.push(data);
    data.startDateFormatted = this.dateFormatting(data.startDate);
    data.dueDateFormatted = this.dateFormatting(data.dueDate);
    data.issueDateFormatted = this.dateFormatting(data.issueDate);
    data.flag = true;
    this.data.push(data);
  
  }
  setTenderData(data) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/${data.TenderNo}`
    );
    newUserRef.set(data, { merge: true });
  }
  
  public uploadFile(allFiles ,tender) {
    if(allFiles) {
      var TenderFileArray = [];
    for (let i = 0; i < allFiles.length; i++) {
      let file = allFiles[i];
      const TenderFile = {
        name:null,
        path:null
     };
      const currentFile = new Upload(file);
   TenderFile.name = file.name;
   TenderFile.path = this.pathBase + '/' + tender.TenderNo + '/' + file.name;
   TenderFileArray.push(TenderFile);
      this.pdfService.pushUpload(currentFile, TenderFile.path);
    }
    tender.files.tenderDocuments = TenderFileArray; 
  }
  return tender;
  } 

  //Date Formating got the teder list page 
  dateFormatting(date) {
const dates = date.split('/');
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
return dates[0] + ' ' + month[dates[1] - 1] + ' ' + dates[2];
  }
}
