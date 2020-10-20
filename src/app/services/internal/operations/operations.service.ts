import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { RoutingService } from '../../routing.service';
import { environment } from 'src/environments/environment';
import { pdfFileService } from '../../pdfFile.service';
import { ImageService } from '../../common/image/image.service';

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
export class OperationsService {

  public employeeData;
public originalEmployeeData = [];
highestEmployeeNumber = 0;
private pathBase = environment.operationsPath;  // change to enquiry once done with testing and ready for production

  constructor( private afs: AngularFirestore,
    private routingService: RoutingService,
    private pdfService: pdfFileService,
    private imageService: ImageService) {
      this.getEmployeeData().then(data => {
        this.employeeData = data;
      });
     }

    async getEmployeeData() {
      var markers = [];
      if(!this.employeeData) {
      await firebase.firestore().collection('Employee').get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            if(doc.data().number.slice(2,6) > this.highestEmployeeNumber) {
              this.highestEmployeeNumber = parseInt(doc.data().number.slice(2,6));
            }
          this.originalEmployeeData.push(doc.data());
          markers.push(doc.data());
          markers[markers.length - 1].dateOfBirthFormatted = this.dateFormatting(doc.data().dob);
          markers[markers.length - 1].flag = true;
        });
      });
    } else {
      markers = this.employeeData;
    }
      return markers;
    }
    newEmployee(data, photoFile, proofFile, resumeFile) {
      data.number = data.number + (this.highestEmployeeNumber + 1);
      data.photoPath = this.uploadFile(photoFile , data, 'photo');
      data.proofPath = this.uploadFile(proofFile , data, 'proof');
      data.resumePath = this.uploadFile(resumeFile , data, 'resume');
      this.setEmployeeData(data);
      this.highestEmployeeNumber = this.highestEmployeeNumber +1;
      this.originalEmployeeData.push({...data});
      data.flag = true;
      data.dateOfBirthFormatted = this.dateFormatting(data.dob);
      this.employeeData.push({...data});
      setTimeout(
        function() {
          this.routingService.loadingFlag = true; 
      this.routingService.rightTabs[0].flag = false;
      this.routingService.rightTabs[1].flag = true;
        }.bind(this),
        500
      );
    }
    changeEmployeeStatus(data,seperationFlag, index) {
      if(seperationFlag) {
        this.setSeperatedEmployeeData({...data});
        this.deleteEmployeeData(data);
        this.employeeData.splice(index, 1);
        this.originalEmployeeData.splice(index, 1);
      } else {
        this.setEmployeeData(data);
      }
    }
    deleteEmployeeData(data) {
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `Employee/${data.number}`
      );
      newUserRef.delete();
    }
    setEmployeeData(data) {
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `Employee/${data.number}`
      );
      newUserRef.set(data, { merge: true });
    }
    setSeperatedEmployeeData(data) {
      data.number = 'S' + data.number;
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `separatedEmployee/${data.number}`
      );
      newUserRef.set(data, { merge: true });
    }

    public uploadFile(file ,data, type) {

        const enquiryFile = {
          name:null,
          path:null
       };
        const currentFile = new Upload(file);
     enquiryFile.name = file.name;
     enquiryFile.path = this.pathBase + '/employee/' + data.number + '/' + type;
        this.pdfService.pushUpload(currentFile, enquiryFile.path);
      
    
    return enquiryFile.path;
    } 
// functions
    dateFormatting(date) {
      const dates = date.split('/');
      var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
      return dates[0] + ' ' + month[dates[1] - 1] + ' ' + dates[2];
        }
}
