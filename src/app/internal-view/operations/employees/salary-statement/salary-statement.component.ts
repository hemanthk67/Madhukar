import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'src/app/services/internal/operations/operations.service';

@Component({
  selector: 'app-salary-statement',
  templateUrl: './salary-statement.component.html',
  styleUrls: ['./salary-statement.component.scss']
})
export class SalaryStatementComponent implements OnInit {
  constructor(public operations: OperationsService) { }

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
  }
}
