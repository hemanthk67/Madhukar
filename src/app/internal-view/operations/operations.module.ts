import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { EmployeesComponent } from './employees/employees.component';
import { EandwAttandanceComponent } from './eandw-attandance/eandw-attandance.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';


@NgModule({
  declarations: [OperationsComponent, EmployeesComponent, EandwAttandanceComponent, EmployeeListComponent, NewEmployeeComponent],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    CommonComponentsModule,
    MatIconModule,
    FormsModule
  ]
})
export class OperationsModule { }
