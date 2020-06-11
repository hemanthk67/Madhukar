import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { pdfFileService } from '../../pdfFile.service';
import { InfoService } from "../../../services/internal/info.service";
import { RoutingService } from '../../routing.service';
import { environment } from 'src/environments/environment'

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
  public editFlag = false;
  public newTender = {
    number: null,
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
      amount: ""
    },
    transactionFee: {
      exemption: true,
      percentage: true,
      amount: ""
    },
    documentCost: {
      exemption: true,
      percentage: true,
      amount: ""
    },
    items: [],
    files: {
      tenderDocuments:[],
uploadedDocuments:[],
queryDocuments:[{
  number: '',
  data:[]
}]
    },
    formatedDocuments: [],
    itemsPrice:[],
    itemsTotalPrice:0
  };
  public tender;
public data;
public originalData = [];
public currentTenderNo = 0;
private queryMessage = null;
private queryMessageReplyIndex = null;

private pathBase = environment.tenderPath;  // change to Tender once done with testing and ready for production
  constructor(
    private afs: AngularFirestore,
    public pdfService: pdfFileService,
    public infoService:InfoService,
    private routingService: RoutingService) {
    this.getMarkers().then(data => {
      this.data = data.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
      this.originalData = this.originalData.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
    });
   }

   // function to et data from the DB
  async getMarkers() {
    var markers = [];
    if(!this.data) {
    await firebase.firestore().collection(this.pathBase).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if(doc.data().number > this.currentTenderNo) {
            this.currentTenderNo = doc.data().number;
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
    if(this.editFlag) {
    tenderData = this.uploadFile(files ,tenderData ,'tender-documents');
  this.setTenderData(tenderData);
  for( let j=0; j < this.originalData.length; j++)
  {
    if(this.originalData[j].number == tenderData.number) {
      this.originalData[j] = {...tenderData};
      tenderData.startDateFormatted = this.dateFormatting(tenderData.startDate);
      tenderData.dueDateFormatted = this.dateFormatting(tenderData.dueDate);
      tenderData.issueDateFormatted = this.dateFormatting(tenderData.issueDate);
      tenderData.flag = true;
      this.data[j]= {...tenderData};
    }
  }
    } else {
    tenderData.number = this.currentTenderNo + 1;
    tenderData = this.uploadFile(files ,tenderData ,'tender-documents');
  this.setTenderData(tenderData);
    this.currentTenderNo = tenderData.number;
    this.originalData.push({...tenderData});
    tenderData.startDateFormatted = this.dateFormatting(tenderData.startDate);
    tenderData.dueDateFormatted = this.dateFormatting(tenderData.dueDate);
    tenderData.issueDateFormatted = this.dateFormatting(tenderData.issueDate);
    tenderData.flag = true;
    this.data.push({...tenderData});
    }
  }
  // function for attatching documents
  attatchDocuments() {
    this.setTenderData(this.tender);
    for(let i =0; i < this.originalData.length; i++) {
      if(this.originalData[i].number == this.tender.number) {
        this.originalData[i].files.uploadedDocuments = this.tender.files.uploadedDocuments;
        this.data[i].files.uploadedDocuments = this.tender.files.uploadedDocuments;
        break;
      }
    }
  }
  // tender submission
  tenderSubmission() {
    this.setTenderData(this.tender);
    for(let i =0; i < this.data.length; i++ ) {
     if( this.data[i].number == this.tender.number ) {
      this.data[i] = {...this.tender};
      this.data[i].startDateFormatted = this.dateFormatting(this.data[i].startDate);
      this.data[i].dueDateFormatted = this.dateFormatting(this.data[i].dueDate);
      this.data[i].issueDateFormatted = this.dateFormatting(this.data[i].issueDate);
     }
     if( this.originalData[i].number == this.tender.number ) {
      this.originalData[i] = {...this.tender}; 
     }
    }
    this.routingService.tenderList();
  
  }
  //query reply submission
  queryReplySubmission(tenderData , files, index) {
this.queryMessageReplyIndex = index;
tenderData = this.uploadFile(files ,tenderData ,'query-reply-documents');
this.setTenderData(tenderData);
for(let i =0; i < this.originalData.length; i++) {
  if(this.originalData[i].number == this.tender.number) {
    this.originalData[i].files = this.tender.files;
    this.data[i].files = this.tender.files;
    break;
  }
}
  }
  //query submission 
  querySubmission(tenderData , files, message) {
    this.queryMessage = message;
    tenderData = this.uploadFile(files ,tenderData ,'query-documents');
    this.setTenderData(tenderData);
    for(let i =0; i < this.originalData.length; i++) {
      if(this.originalData[i].number == this.tender.number) {
        this.originalData[i].files = this.tender.files;
        this.data[i].files = this.tender.files;
        break;
      }
    }
  }
  // function to set upload new data
  setTenderData(data) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/${data.number}`
    );
    newUserRef.set(data, { merge: true });
  }
  // common files upload function
  public uploadFile(allFiles ,tender, type) {
    if(allFiles) {
      // var TenderFileArray = [];
      var queryDocuments = {
        number:null,
        message: this.queryMessage,
        data:[],
        replyMessage: null,
        replyData: []
     };
    for (let i = 0; i < allFiles.length; i++) {
      let file = allFiles[i];
      const TenderFile = {
        name:null,
        path:null
     };
      const currentFile = new Upload(file);
   TenderFile.name = file.name;
   if (type == 'upload-documents') {
    TenderFile.path = this.pathBase + '/' + tender.number + '/uploadedFile/' + file.name;
    tender.files.uploadedDocuments.push({...TenderFile}); 
    } else if (type == 'tender-documents') {
      TenderFile.path = this.pathBase + '/' + tender.number + '/' + file.name;
    if(this.editFlag) {
      tender.files.tenderDocuments[tender.files.tenderDocuments.length] = {...TenderFile};
    } else {
    tender.files.tenderDocuments.push({...TenderFile}); 
    }
      } else if(type == 'query-documents') {
      TenderFile.path = this.pathBase + '/' + tender.number + '/' + file.name;
queryDocuments.data.push({...TenderFile});
      } else if(type == 'query-reply-documents') {
        TenderFile.path = this.pathBase + '/' + tender.number + '/' + this.queryMessageReplyIndex + '/' + file.name;
        const replyData = {
name: file.name,
path: TenderFile.path
        };
        tender.files.queryDocuments[this.queryMessageReplyIndex].replyData.push({...replyData});
      }
      this.pdfService.pushUpload(currentFile, TenderFile.path);
    }  
  }
  if(type == 'query-documents') {
  if(tender.files.queryDocuments && tender.files.queryDocuments.length) {
    queryDocuments.number = tender.files.queryDocuments.length;
tender.files.queryDocuments[tender.files.queryDocuments.length] = {...queryDocuments};
  } else {
    tender.files.queryDocuments = [];
    queryDocuments.number = 0;
    tender.files.queryDocuments[0] = {...queryDocuments};
  }
  }
  return tender;
  } 
  removeFiles(files) {
    console.log(files);
  }

  // funtion for manual uploading of files
  uploadManuualFiles(tenderData , files) {
    tenderData = this.uploadFile(files ,tenderData ,'upload-documents');
    this.setTenderData(tenderData);
    for(let i =0; i < this.originalData.length; i++) {
      if(this.originalData[i].number == this.tender.number) {
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
 TenderFile.path = this.pathBase + '/' + tender.number + '/uploadedFile/' + file.name;
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
