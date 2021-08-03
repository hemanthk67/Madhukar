import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { pdfFileService } from 'src/app/services/pdfFile.service';
import { environment } from 'src/environments/environment';
import { PurchaseOrder } from '../internal-view/admin/po-review/po.model';
import { map, take } from 'rxjs/operators';
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
  originalPos: any;
  pos: any;
  po: any;
  editFlag: boolean;
  constructor(private afs: AngularFirestore,
    public pdfService: pdfFileService) {
      this.getPoInfo();
    }

    // common files upload function
    public uploadFile(allFiles ,po, editFlag) {
      if(!editFlag) {
    po.number = this.poNumber + 1;
      }
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
      if(editFlag && po.files.customerDocuments.length) {
        po.files.customerDocuments[po.files.customerDocuments.length] = {...poFile};
      } else {
      po.files.customerDocuments.push({...poFile});
      }

        this.pdfService.pushUpload(currentFile, poFile.path);
      }
    }
    return po;
    }
    public setPoData(po) {
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `${this.pathBase}/${po.number}`
      );
      newUserRef.set(JSON.parse(JSON.stringify(po)), { merge: true });
      if((this.poNumber + 1) == po.number)
      {
      this.setPoInfo(po);
      this.poNumber = this.poNumber + 1;
      } else {
        this.updatePoInfo(po);
      }
    }
    updatePoInfo(data) {
      for(let i=0; i < this.poInfo.length; i++) {
        if(this.poInfo[i].poNumber == data.poNumber) {
          this.poInfo[i].customer = data.customer;
          this.poInfo[i].firm = data.firm;
          this.poInfo[i].issueDate = data.issueDate;
          this.poInfo[i].number = data.number;
          this.poInfo[i].poNumber = data.poNumber;
        }
      }
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `${this.pathBase}/info`
      );
      const pushData ={
        data: this.poInfo
      };
      newUserRef.set(pushData, { merge: true });
    }
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
    async getNewPOs() {
      var purchaseOrders: PurchaseOrder[] = [];
      try {
        purchaseOrders = await this.afs.collection<PurchaseOrder>(environment.poPath,
          query => query.where('status', '==', 'New').orderBy("number", "asc").limit(20))
          .valueChanges()
          .pipe(take(1))
          .toPromise();

      } catch (error) {
        console.error("There was a problem fetching purchase orders ! : " + error);
      }
      this.originalPos =JSON.parse(JSON.stringify(purchaseOrders));
      this.pos =[...purchaseOrders];
      for (let i=0; i < purchaseOrders.length; i++) {
        this.pos[i].issueDateFormatted = this.dateFormatting(purchaseOrders[i].issueDate);    
        this.pos[i].deliveryDateFormatted = this.dateFormatting(purchaseOrders[i].deliveryDate);
        this.pos[i].flag = true;
        this.pos[i].totalPrice = 0;
        for(let j=0; j < this.pos[i].itemPrice.length; j++) {
          this.pos[i].totalPrice = this.pos[i].totalPrice + this.pos[i].itemPrice[j].totalPrice; 
        }
        this.pos[i].totalPriceGst = this.pos[i].totalPrice + (this.pos[i].totalPrice * 0.18);
      }
    }

    // async getMorePOs(lastItem: number, size: number): Promise<PurchaseOrder[]> {
    //   var purchaseOrders: PurchaseOrder[] = [];
    //   try {
    //     purchaseOrders = await this.afs.collection<PurchaseOrder>(environment.poPath,
    //       query => query.limit(size).where('number', '>=', 0).orderBy('number').startAfter(lastItem))
    //       .valueChanges()
    //       .pipe(take(1))
    //       .toPromise();

    //   } catch (error) {
    //     console.error("There was a problem fetching purchase orders ! : " + error);
    //   }
    //   return purchaseOrders;

    // }
      //Date Formating got the teder list page 
  dateFormatting(date) {
    const dates = date.split('/');
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    return dates[0] + ' ' + month[dates[1] - 1] + ' ' + dates[2];
      }
}
