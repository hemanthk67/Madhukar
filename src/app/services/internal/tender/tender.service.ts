import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { pdfFileService } from '../../pdfFile.service';
import { InfoService } from "../../../services/internal/info.service";

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
    },
    formatedDocuments: []
  };
public data;
public originalData = [];
public currentTenderNo = 0;

private pathBase = 'test';  // change to Tender once done with testing and ready for production
  constructor(
    private afs: AngularFirestore,
    public pdfService: pdfFileService,
    public infoService:InfoService) {
    this.getMarkers().then(data => {
      this.data = data;
    });
   }

   // function to et data from the DB
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
  // function to push new tender data
  pushTenderData(tenderData, files) {
    tenderData.TenderNo = this.currentTenderNo + 1;
    tenderData = this.uploadFile(files ,tenderData ,'tender-documents');
  this.setTenderData(tenderData);
    this.currentTenderNo = tenderData.TenderNo;
    this.originalData.push({...tenderData});
    tenderData.startDateFormatted = this.dateFormatting(tenderData.startDate);
    tenderData.dueDateFormatted = this.dateFormatting(tenderData.dueDate);
    tenderData.issueDateFormatted = this.dateFormatting(tenderData.issueDate);
    tenderData.flag = true;
    this.data.push({...tenderData});
  }
  // function for attatching documents
  attatchDocuments() {
    this.setTenderData(this.tender);
    console.log(this.originalData);
    for(let i =0; i < this.originalData.length; i++) {
      if(this.originalData[i].TenderNo == this.tender.TenderNo) {
        this.originalData[i].files.uploadedDocuments = this.tender.files.uploadedDocuments;
        this.data[i].files.uploadedDocuments = this.tender.files.uploadedDocuments;
        break;
      }
    }
    console.log(this.originalData);
  }
  // function to set upload new data
  setTenderData(data) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/${data.TenderNo}`
    );
    newUserRef.set(data, { merge: true });
  }
  // common files upload function
  public uploadFile(allFiles ,tender, type) {
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
   if (type == 'upload-documents') {
    TenderFile.path = this.pathBase + '/' + tender.TenderNo + '/uploadedFile/' + file.name;
    TenderFileArray.push(TenderFile);
    tender.files.uploadedDocuments.push(TenderFile); 
    } else if (type == 'tender-documents') {
      TenderFile.path = this.pathBase + '/' + tender.TenderNo + '/' + file.name;
    TenderFileArray.push(TenderFile);
      }
      this.pdfService.pushUpload(currentFile, TenderFile.path);
    }
    if (type == 'tender-documents') {
    tender.files.tenderDocuments = TenderFileArray; 
    }
  }
  return tender;
  } 

  // funtion for manual uploading of files
  uploadManuualFiles(tenderData , files) {
    tenderData = this.uploadFile(files ,tenderData ,'upload-documents');
    this.setTenderData(tenderData);
    for(let i =0; i < this.originalData.length; i++) {
      if(this.originalData[i].TenderNo == this.tender.TenderNo) {
        this.originalData[i].files.uploadedDocuments = this.tender.files.uploadedDocuments;
        this.data[i].files.uploadedDocuments = this.tender.files.uploadedDocuments;
        break;
      }
    }
  }
  // funtion for addind new common files
  uploadCommonFile( file ,tender, type) {
    const TenderFile = {
      name:null,
      path:null
   };
    const currentFile = new Upload(file);
 TenderFile.name = file.name;
 TenderFile.path = this.pathBase + '/' + tender.TenderNo + '/uploadedFile/' + file.name;
    this.pdfService.pushUpload(currentFile, TenderFile.path);
    this.infoService.setCommonDocumentData(file.name, TenderFile.path, type)
  }

  //Date Formating got the teder list page 
  dateFormatting(date) {
const dates = date.split('/');
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
return dates[0] + ' ' + month[dates[1] - 1] + ' ' + dates[2];
  }
}