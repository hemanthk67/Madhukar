import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  public workOrder = {
    number: 0,
  issueDate:'',
  status:'New Work Order',
  specialFeatures:'',
  firm: '',
  items:[],
  files: {
    designDocuments:[],
technicalDocuments:[]
  },
  poInternalNumber: 0,
  warrentyFromCommission: '',
  warrentyFromSupply: '',
  warrentyEarly: true,
  workOrderMode: 'Private',
  remarks: '',
  deliveryState: 'Telangana',
  deliveryAddress: '',
  deliveryDate: ''  
};

private pathBase = environment.productionPath;
public productionInfo:any;
  workOrderNumber = 0;
  constructor(private afs: AngularFirestore) { 
    this.getProductionInfo();
  }
  newWorkOrder(value) {
    this.workOrder.firm = value.firm;
    this.workOrder.issueDate = this.presentDate();
    this.workOrder.warrentyEarly = value.warrentyEarly;
    this.workOrder.warrentyFromSupply = value.warrentyFromSupply;
    this.workOrder.warrentyFromCommission = value.warrentyFromCommission;
    this.workOrder.poInternalNumber = value.number;
    this.workOrder.remarks = value.remarks;
    this.workOrder.deliveryState = value.deliveryState;
    this.workOrder.deliveryAddress = value.deliveryAddress;
    this.workOrder.deliveryDate = value.deliveryDate;
    this.workOrder.specialFeatures = value.specialFeatures;
    this.workOrder.items = value.items;
    this.workOrder.workOrderMode = value.poMode;
    this.workOrder.number = this.workOrderNumber + 1;
    this.setProductionWorkOrder(this.workOrder);
  }
  setProductionWorkOrder(data) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/${data.number}`
    );
    newUserRef.set(JSON.parse(JSON.stringify(data)), { merge: true });
    if((this.workOrderNumber + 1) == data.number)
    {
      this.setProductionInfo(data);
    this.workOrderNumber = this.workOrderNumber + 1;
    } else {
      // this.updatePoInfo(po);
    }
  }
  setProductionInfo(data) {
    var newWorkOrder = {
      firm:data.firm,
      issueDate: data.issueDate,
      workOrderNumber: data.number
    };
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/info`
    );
    this.productionInfo.push(newWorkOrder);
    const pushData ={
      data: this.productionInfo
    };
    newUserRef.set(pushData, { merge: true });
  }

  getProductionInfo() {
    firebase.firestore().collection(this.pathBase).doc('info').get()
    .then(querySnapshot => {
      this.productionInfo = querySnapshot.data().data;
      for(let i =0 ; i< this.productionInfo.length; i++) {
        if( this.workOrderNumber < this.productionInfo[i].workOrderNumber) {
          this.workOrderNumber = this.productionInfo[i].workOrderNumber;
        }
      }
    });
  }

  // needed functions
  presentDate() {
    var today = new Date();
var dd = String(today.getDate());
var mm = String(today.getMonth() + 1); //January is 0!
var yyyy = today.getFullYear();


return( dd + '/' + mm + '/' + yyyy);
  }
}
