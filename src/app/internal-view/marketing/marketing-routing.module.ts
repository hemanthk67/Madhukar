import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { PrepareOfferComponent } from './prepare-offer/prepare-offer.component';

const routes: Routes = [{ path: '', component: MarketingComponent }
,{ path: 'PrepareOffer', component: PrepareOfferComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
