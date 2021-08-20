import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { environment } from "src/environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductionService {
  public workOrder = {
    number: 0,
    issueDate: "",
    status: "New Work Order",
    specialFeatures: "",
    firm: "",
    items: [],
    files: {
      designDocuments: [],
      technicalDocuments: [],
    },
    poInternalNumber: 0,
    warrentyFromCommission: 0,
    warrentyFromSupply: 0,
    warrentyEarly: true,
    workOrderMode: "Private",
    remarks: "",
    deliveryState: "Telangana",
    deliveryAddress: "",
    deliveryDate: "",
  };
  workOrders: any;
  private pathBase = environment.productionPath;
  public productionInfo: any;
  public workOrderNumber = 0;
  public nextworkOrderNumber = 0;
  public originalWorkOrdersData = [];
  public workOrdersData = [];
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
    if (this.workOrderNumber + 1 == data.number) {
      this.setProductionInfo(data);
      this.workOrderNumber = this.workOrderNumber + 1;
    } else {
      // this.updatePoInfo(po);
    }
  }
  async getProductionWorkOrders() {
    var markers = [];
    try {
      if (this.nextworkOrderNumber == 0) {
        markers = await this.afs
          .collection(this.pathBase, (query) =>
            query.orderBy("number", "desc").limit(20)
          )
          .valueChanges()
          .pipe(take(1))
          .toPromise();
      } else if (this.nextworkOrderNumber > 1001) {
        markers = await this.afs
          .collection(this.pathBase, (query) =>
            query
              .orderBy("number", "desc")
              .startAt(this.nextworkOrderNumber)
              .limit(20)
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
    if (this.nextworkOrderNumber == 0) {
      this.originalWorkOrdersData = JSON.parse(JSON.stringify(markers));
    } else if (this.nextworkOrderNumber > 1001) {
      this.originalWorkOrdersData = this.originalWorkOrdersData.concat(
        JSON.parse(JSON.stringify(markers))
      );
    }
    for (let i = 0; i < markers.length; i++) {
      markers[i].issueDateFormatted = this.dateFormatting(markers[i].issueDate);
      markers[i].deliveryDateFormatted = this.dateFormatting(
        markers[i].deliveryDate
      );
      markers[i].flag = true;
    }
    if (this.nextworkOrderNumber == 0) {
      this.workOrdersData = JSON.parse(JSON.stringify(markers));
    } else if (this.nextworkOrderNumber > 1001) {
      this.workOrdersData = this.workOrdersData.concat(
        JSON.parse(JSON.stringify(markers))
      );
    }

    this.nextworkOrderNumber = this.originalWorkOrdersData[0].number - 20;
  }
  setProductionInfo(data) {
    var newWorkOrder = {
      firm: data.firm,
      issueDate: data.issueDate,
      workOrderNumber: data.number,
    };
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.pathBase}/info`
    );
    this.productionInfo.push(newWorkOrder);
    const pushData = {
      data: this.productionInfo,
    };
    newUserRef.set(pushData, { merge: true });
  }

  getProductionInfo() {
    firebase
      .firestore()
      .collection(this.pathBase)
      .doc("info")
      .get()
      .then((querySnapshot) => {
        this.productionInfo = querySnapshot.data().data;
        for (let i = 0; i < this.productionInfo.length; i++) {
          if (this.workOrderNumber < this.productionInfo[i].workOrderNumber) {
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

    return dd + "/" + mm + "/" + yyyy;
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
