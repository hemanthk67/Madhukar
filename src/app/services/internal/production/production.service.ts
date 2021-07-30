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
    number: null,
  issueDate:'',
  status:'New Enquiry',
  specialFeatures:'',
  firm: 'THOTA COLDCEL PVT LTD.',
  items:[
    {description:'',
  rating: '',
  classHv: '11',
  classLv:'0.433',
  type:'ONAN',
  standard:'',
  tapVariation:'OCTC',
  terminalHv:'Bare Bushings',
  terminalLv:'Bare Bushings',
qty:1,
remark:''}
  ],
  files: {
    designDocuments:[],
technicalDocuments:[],

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
  constructor() { }
}
