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
import { AuthService } from '../../auth.service';

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
  presentAttandanceData: any;
  originalPresentAttandanceData: any;
  attandanceInfo: any;
  public originalEmployeeData = [];
  highestEmployeeNumber = 0;
  presentAttandanceDate: any;
  userData: any;
  private pathBase = environment.operationsPath;  // change to enquiry once done with testing and ready for production

  constructor( private afs: AngularFirestore,
    private routingService: RoutingService,
    private pdfService: pdfFileService,
    private imageService: ImageService,
    private authService: AuthService) {
      this.getEmployeeData().then(data => {
        this.employeeData = data;
      });
      this.getEmployeeAttandanceInfo();
     }
start() {
  this.userData = this.authService.userData;
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

    getEmployeeAttandanceInfo() {
      firebase.firestore().collection('EmployeeAttandance').doc('info').get()
      .then(querySnapshot => {
        this.attandanceInfo = querySnapshot.data().data;
      });
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
      this.routingService.loadingFlag = true; 
      setTimeout(
        function() {
          this.routingService.loadingFlag = false; 
      this.routingService.rightTabs[1].flag = false;
      this.routingService.rightTabs[2].flag = true;
        }.bind(this),
        500
      );
    }
    employeeAttandance (dataArray, date) {
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `EmployeeAttandance/${date}`
      );
      var data = { data:dataArray };
      newUserRef.set(data, { merge: true });
      this.routingService.loadingFlag = true; 
      setTimeout(
        function() {
          this.routingService.loadingFlag = false; 
        }.bind(this),
        500
      );
    }

    employeeAttandanceInfoData(value) {
      const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
        `EmployeeAttandance/info`
      );
      var data = { data:this.attandanceInfo };
      var valueData = {
name:value
      };
      data.data.push(valueData);
      newUserRef.set(data, { merge: true });
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

      this.routingService.loadingFlag = true; 
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
        getEmployeeAttandanceData(docName) {
          firebase.firestore().collection('EmployeeAttandance').doc(docName).get()
           .then(querySnapshot => {
             this.presentAttandanceData = querySnapshot.data().data;
             this.originalPresentAttandanceData = querySnapshot.data().data;
             for(let i=1; i < this.presentAttandanceData.length; i++) {
              this.presentAttandanceData[i].compensationHrs =0;
              this.presentAttandanceData[i].weekHrs = 0;
              this.presentAttandanceData[i].otHrs = 0;
              this.presentAttandanceData[i].absentNumber = 0;
              this.presentAttandanceData[i].leaveNumber = 0;
              this.presentAttandanceData[i].weekOffNumber = 0;
              this.presentAttandanceData[i].holidayNumber = 0;
              this.presentAttandanceData[i].compensationHolidayNumber = 0;
              for(let j=0; j < this.presentAttandanceData[i].weeks.length; j++) {
                this.presentAttandanceData[i].compensationHrs = this.presentAttandanceData[i].compensationHrs + this.presentAttandanceData[i].weeks[j].compensationHrs;
                this.presentAttandanceData[i].weekHrs = this.presentAttandanceData[i].weekHrs + this.presentAttandanceData[i].weeks[j].weekHrs;
                this.presentAttandanceData[i].otHrs = this.presentAttandanceData[i].otHrs + this.presentAttandanceData[i].weeks[j].otHrs;
              }
              for(let j=0; j < this.presentAttandanceData[i].dates.length; j++) {
                if (this.presentAttandanceData[i].dates[j].absent) {
                  this.presentAttandanceData[i].absentNumber++;
                }
                if (this.presentAttandanceData[i].dates[j].leave) {
                  this.presentAttandanceData[i].leaveNumber++;
                }
                if (this.presentAttandanceData[i].dates[j].weekOff) {
                  this.presentAttandanceData[i].weekOffNumber++;
                }
                if (this.presentAttandanceData[i].dates[j].holiday) {
                  this.presentAttandanceData[i].holidayNumber++;
                }
                if (this.presentAttandanceData[i].dates[j].compensationHoliday) {
                  this.presentAttandanceData[i].compensationHolidayNumber++;
                }
              }
              this.presentAttandanceData[i].otHrs = this.presentAttandanceData[i].otHrs - this.presentAttandanceData[i].compensationHrs;
              this.presentAttandanceData[i].compensationHrs = 0;
              if(this.presentAttandanceData[i].otHrs < 0) {
                this.presentAttandanceData[i].compensationHrs = -(this.presentAttandanceData[i].otHrs);
                this.presentAttandanceData[i].otHrs = 0;
              }
                for(let k=0; k < this.employeeData.length; k++) {
                  if(this.employeeData[k].number == this.presentAttandanceData[i].number) {
                    this.presentAttandanceData[i].salary = this.employeeData[k].salary.monthlySalary;
                    this.presentAttandanceData[i].bonus = this.employeeData[k].salary.monthlyFixedBonus;
                  }
                }
             }
           });
       }
}
