import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'src/app/services/internal/operations/operations.service';

@Component({
  selector: 'app-salary-statement',
  templateUrl: './salary-statement.component.html',
  styleUrls: ['./salary-statement.component.scss']
})
export class SalaryStatementComponent implements OnInit {
  constructor(public operations: OperationsService) { }
  startFlag = true;
  ngOnInit() {
  }
  attandanceDateChange() {
    if(this.operations.presentAttandanceDate !== '') {
      this.operations.getEmployeeAttandanceData(this.operations.presentAttandanceDate);
    }
  }
  paid(index) {
    if(this.operations.originalPresentAttandanceData[index].paidFlag){
      this.operations.originalPresentAttandanceData[index].paidFlag = false;
    } else {
      this.operations.originalPresentAttandanceData[index].paidFlag = true;
    }
  }
  submit() {
    this.operations.employeeAttandance(this.operations.originalPresentAttandanceData, 'Sep-Oct-2020');
    this.startFlag = true;
  }
  start() {
    if (this.startFlag) {
    for(let i=1; i < this.operations.presentAttandanceData.length; i ++) {
      this.operations.presentAttandanceData[i].basicSalaryByMonth = ( Math.round(this.operations.presentAttandanceData[i].weekHrs) + Math.round(this.operations.presentAttandanceData[i].otHrs))*(this.operations.presentAttandanceData[i].salary/(30*8) );
    }
    this.startFlag = false;
  }
    return true;
  }
}
