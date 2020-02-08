import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderComponent } from './tender.component';
import { NewTenderComponent } from './new-tender/new-tender.component';


@NgModule({
  declarations: [TenderComponent, NewTenderComponent],
  imports: [
    CommonModule,
    TenderRoutingModule
  ]
})
export class TenderModule { }
