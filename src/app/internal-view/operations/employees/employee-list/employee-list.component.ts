import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/common/image/image.service';
import { OperationsService } from 'src/app/services/internal/operations/operations.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  seperationFlag = false;
 changeFlag = false;
 startFlag = true;
 changeIndex: any;
  constructor(public operations: OperationsService,
    public routingService: RoutingService,
    public imageService: ImageService) { }

  ngOnInit() {
  }
  userStatus(status, index) {
    if(index != this.changeIndex) {
      this.changeFlag = false;
      this.seperationFlag = false;
    }
    if(status == "Active") {
      if(!this.operations.employeeData[index].active) {
        this.operations.employeeData[index].active = true;
        this.changeFlag = true;
        this.changeIndex = index;
        this.seperationFlag = false;
      }
      if(this.operations.employeeData[index].active == this.operations.originalEmployeeData[index].active ) {
        this.changeFlag = false;
      }
    } else if(status == "In-Active") {
      if(this.operations.employeeData[index].active) {
        this.operations.employeeData[index].active = false;
        this.changeFlag = true;
        this.changeIndex = index;
        this.seperationFlag = false;
      }
      if(this.operations.employeeData[index].active == this.operations.originalEmployeeData[index].active ) {
        this.changeFlag = false;
      }
     } else {
        this.seperationFlag = !this.seperationFlag;
        this.changeFlag = this.seperationFlag;
        this.changeIndex = index;
        if(this.seperationFlag) {
          this.operations.employeeData[index].active = false;
        }
        if(this.operations.employeeData[index].active != this.operations.originalEmployeeData[index].active) {
          this.changeFlag = true;
        }
      }
    
  }
  submit() {
    this.operations.originalEmployeeData[this.changeIndex].active = this.operations.employeeData[this.changeIndex].active;
    this.changeFlag = false;
    this.operations.changeEmployeeStatus(this.operations.originalEmployeeData[this.changeIndex], this.seperationFlag, this.changeIndex);
    this.seperationFlag = false;

  }
  start() {
    if(this.startFlag) {
      for(let i =0; i < this.operations.employeeData.length ; i++) {
        this.imageService.getImageUrl(this.operations.employeeData[i].photoPath).then( url => {
          this.operations.employeeData[i].photoUrl = url;
            console.log(url);   
           });
      }
  this.startFlag = false;
    }
    return true;
  }
}
