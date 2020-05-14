import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  pathBase = 'Info';
  data: any;
  organization: any;
  originalOrganizationData:any;
  experienceDocuments: any;
  originalExperienceDocuments: any;
  commonDocuments: any;
  originalCommonDocuments: any;
  constructor(
    private afs: AngularFirestore,
    private router: Router) { 
    setTimeout(
      function() {
        this.getMarkers();
      }.bind(this),
      1000
    );
    
   }
setCommonDocumentData( name, path, type) {
  const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
    `${this.pathBase}/commonDocuments`
  );
  const data = {
    name: name,
    path: path,
    type: type
  };
  this.originalCommonDocuments.data.push(data);
  newUserRef.set(this.originalCommonDocuments, { merge: true });
  this.commonDocuments.push(data);
}
  async getMarkers() {
    await firebase.firestore().collection(this.pathBase).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if(doc.data().name == 'Organization') {
            this.organization = doc.data().data;
            this.originalOrganizationData = doc.data();
          } else if (doc.data().name == 'Experience Documents') {
            this.experienceDocuments = doc.data().data;
            this.originalExperienceDocuments = doc.data();
          } else if (doc.data().name == 'Common Documents') {
            this.commonDocuments = doc.data().data;
            this.originalCommonDocuments = doc.data();
          }
      });
    });
  }
}
