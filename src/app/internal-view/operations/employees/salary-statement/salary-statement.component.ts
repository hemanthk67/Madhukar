import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'src/app/services/internal/operations/operations.service';

@Component({
  selector: 'app-salary-statement',
  templateUrl: './salary-statement.component.html',
  styleUrls: ['./salary-statement.component.scss']
})
export class SalaryStatementComponent implements OnInit {
  attandanceDate: any;
  constructor(public operations: OperationsService) { }

  ngOnInit() {
  }
  attandanceDateChange() {
    this.operations.presentAttandanceDate = this.attandanceDate;
    this.operations.getEmployeeAttandanceData(this.attandanceDate);
  }
  paid(index) {
    if(this.operations.originalPresentAttandanceData[index].paidFlag){
      this.operations.originalPresentAttandanceData[index].paidFlag = false;
    } else {
      this.operations.originalPresentAttandanceData[index].paidFlag = true;
    }
  }
  submit() {
    var data = {
      data: this.operations.originalPresentAttandanceData
    };
    this.operations.employeeAttandance(data, 'Sep-Oct-2020');
  }
}
