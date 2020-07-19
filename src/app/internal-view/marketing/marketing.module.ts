import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';

import { CommonComponentsModule } from "src/app/common-components/common-components.module";

import { MarketingComponent } from './marketing.component';
import { PrepareOfferComponent } from './prepare-offer/prepare-offer.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MarketingComponent, PrepareOfferComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    CommonComponentsModule,
    FormsModule,
    MatIconModule
  ]
})
export class MarketingModule { }
