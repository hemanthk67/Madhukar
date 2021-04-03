import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { pdfFileService } from 'src/app/services/pdfFile.service';
import { environment } from 'src/environments/environment';
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
export class PoReceivedService {

  private pathBase = environment.poPath;
  public poInfo:any;
  public poNumber = 0;
  constructor(private afs: AngularFirestore,  
    public pdfService: pdfFileService) { 
      this.getPoInfo();
    }

    // common files upload function
    public uploadFile(allFiles ,po, editFlag) {
      if(allFiles) {
      for (let i = 0; i < allFiles.length; i++) {
        let file = allFiles[i];
        const poFile = {
          name:null,
          path:null
       };
        const currentFile = new Upload(file);
     poFile.name = file.name;
        poFile.path = this.pathBase + '/' + po.number + '/' + file.name;
      if(editFlag) {
        po.files.customerDocuments[po.files.customerDocuments.length] = {...poFile};
      } else {
      po.files.customerDocuments.push({...poFile}); 
      }
  
        this.pdfService.pushUpload(currentFile, poFile.path);
      }  
    }
    po.number = this.poNumber + 1;
    return po;
    }
    public setPoData(po) {
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `${this.pathBase}/${po.number}`
      );
      newUserRef.set(JSON.parse(JSON.stringify(po)), { merge: true });
      this.setPoInfo(po);
      this.poNumber = this.poNumber + 1;
    }  
    // updatePoInfo(data) {

    // }
    setPoInfo(data) {
      var newPo = {
        customer: data.customer,
        firm:data.firm,
        issueDate: data.issueDate,
        number: data.number,
        poNumber: data.poNumber
      };
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `${this.pathBase}/info`
      );
      this.poInfo.push(newPo);
      const pushData ={
        data: this.poInfo
      };
      newUserRef.set(pushData, { merge: true });
    }

    getPoInfo() {
      firebase.firestore().collection(this.pathBase).doc('info').get()
      .then(querySnapshot => {
        this.poInfo = querySnapshot.data().data;
        for(let i =0 ; i< this.poInfo.length; i++) {
          if( this.poNumber < this.poInfo[i].number) {
            this.poNumber = this.poInfo[i].number;
          }
        }
      });
      
    }
}
