import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { EmployeesComponent } from './employees/employees.component';
import { EandwAttandanceComponent } from './eandw-attandance/eandw-attandance.component';

const routes: Routes = [{ path: '', component: OperationsComponent },
{ path: 'Employees', component: EmployeesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
