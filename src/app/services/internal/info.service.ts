import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class InfoService {
  pathBase = "Info";
  data: any;
  organization: any;
  originalOrganizationData: any;
  pvtCustomerData: any;
  originalPvtCustomerData: any;
  experienceDocuments: any;
  originalExperienceDocuments: any;
  commonDocuments: any;
  originalCommonDocuments: any;
  competitorDetails: any;
  competitorMakeDetails: any;
  originalCompetitorDetails: any;
  employeeData: any;
  originalEmployeeData: any;

  constructor(private afs: AngularFirestore, private router: Router) {
    setTimeout(
      function () {
        this.getMarkers();
      }.bind(this),
      1000
    );
  }
  setCommonDocumentData(name, path, type) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/commonDocuments`
    );
    const data = {
      name: name,
      path: path,
      type: type,
    };
    this.originalCommonDocuments.data.push(data);
    newUserRef.set(this.originalCommonDocuments, { merge: true });
    this.commonDocuments.push(data);
  }
  addPvtCustomerName(data) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/pvtCutomersDetails`
    );
    this.originalPvtCustomerData.data.push(data);
    newUserRef.set(this.originalPvtCustomerData, { merge: true });
    this.pvtCustomerData.push({ ...data });
  }
  updatePvtCustomerName(data, index) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/pvtCutomersDetails`
    );
    this.originalPvtCustomerData.data[index].details.push(data);
    newUserRef.set(this.originalPvtCustomerData, { merge: true });
    this.pvtCustomerData[index].details.push({ ...data });
  }
  addOrganizationName(data) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/Organization`
    );
    this.originalOrganizationData.data.push(data);
    newUserRef.set(this.originalOrganizationData, { merge: true });
    this.competitorDetails.push({ ...data });
  }
  addCompetitorDetails(data, makeData, makeFlag) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/CompetitorDetails`
    );
    this.originalCompetitorDetails.data.push(data);
    if (makeFlag) {
      this.originalCompetitorDetails.makeData.push(makeData);
    }
    newUserRef.set(this.originalCompetitorDetails, { merge: true });
    this.competitorDetails.push({ ...data });
    if (makeFlag) {
      this.competitorMakeDetails.push({ ...makeData });
    }
  }
  async getMarkers() {
    await firebase
      .firestore()
      .collection(this.pathBase)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().name == "Organization") {
            this.organization = doc.data().data;
            this.originalOrganizationData = doc.data();
          } else if (doc.data().name == "Experience Documents") {
            this.experienceDocuments = doc.data().data;
            this.originalExperienceDocuments = doc.data();
          } else if (doc.data().name == "Common Documents") {
            this.commonDocuments = doc.data().data;
            this.originalCommonDocuments = doc.data();
          } else if (doc.data().name == "Competitor Details") {
            this.competitorDetails = doc.data().data;
            this.competitorMakeDetails = doc.data().makeData;
            this.originalCompetitorDetails = doc.data();
          } else if (doc.data().name == "Private Customers") {
            this.pvtCustomerData = doc.data().data;
            this.originalPvtCustomerData = doc.data();
          } else if (doc.data().name == "Employees") {
            this.employeeData = doc.data().data;
            this.originalEmployeeData = doc.data();
          }
        });
      });
  }
}
