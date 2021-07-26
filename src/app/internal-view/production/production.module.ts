import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { ProductionListComponent } from './production-list/production-list.component';


@NgModule({
  declarations: [ProductionComponent, ProductionListComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule
  ]
})
export class ProductionModule { }
