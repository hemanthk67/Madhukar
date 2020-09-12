import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { EmployeesComponent } from './employees/employees.component';
import { EandwAttandanceComponent } from './eandw-attandance/eandw-attandance.component';


@NgModule({
  declarations: [OperationsComponent, EmployeesComponent, EandwAttandanceComponent],
  imports: [
    CommonModule,
    OperationsRoutingModule
  ]
})
export class OperationsModule { }
