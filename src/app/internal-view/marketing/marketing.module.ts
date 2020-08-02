import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';

import { CommonComponentsModule } from "src/app/common-components/common-components.module";

import { MarketingComponent } from './marketing.component';
import { PrepareOfferComponent } from './prepare-offer/prepare-offer.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NewEnquiryComponent } from './new-enquiry/new-enquiry.component';


@NgModule({
  declarations: [MarketingComponent, PrepareOfferComponent, NewEnquiryComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    CommonComponentsModule,
    FormsModule,
    MatIconModule
  ]
})
export class MarketingModule { }
