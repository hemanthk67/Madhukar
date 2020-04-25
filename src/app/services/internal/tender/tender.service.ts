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
public data;
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
    const markers = [];
    await firebase.firestore().collection(this.pathBase).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if(doc.data().TenderNo > this.currentTenderNo) {
            this.currentTenderNo = doc.data().TenderNo;
          }
        markers.push(doc.data());
      });
    });
    return markers;
  }
  pushTenderData(data, files) {
    data.TenderNo = this.currentTenderNo + 1;
    console.log(files);
    data = this.uploadFile(files ,data);
        const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/${data.TenderNo}`
    );
    newUserRef.set(data, { merge: true });
    this.currentTenderNo = data.TenderNo;
  
  }
  
  public uploadFile(allFiles ,tender) {
    if(allFiles) {
      const TenderFileArray = [];
      const TenderFile = {
        name:null,
        path:null
     }
    for (let i = 0; i < allFiles.length; i++) {
      let file = allFiles[i];
      console.log(file);
      const currentFile = new Upload(file);
   TenderFile.name = file.name;
   TenderFile.path = this.pathBase + '/' + tender.TenderNo + '/' + file.name;
   TenderFileArray.push(TenderFile);
      this.pdfService.pushUpload(currentFile, TenderFile.path);
    }
    tender.files = TenderFileArray; 
  }
  return tender;
  } 
}
