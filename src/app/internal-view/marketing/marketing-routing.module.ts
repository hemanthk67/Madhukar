import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { PrepareOfferComponent } from './prepare-offer/prepare-offer.component';
import { NewEnquiryComponent } from './new-enquiry/new-enquiry.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { MarketingResultComponent } from './marketing-result/marketing-result.component';

const routes: Routes = [{ path: '', component: MarketingComponent }
,{ path: 'PrepareOffer', component: PrepareOfferComponent }
,{ path: 'NewEnquiry', component: NewEnquiryComponent }
,{ path: 'EnquiryList', component: EnquiryListComponent }
,{ path: 'Results', component: MarketingResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
