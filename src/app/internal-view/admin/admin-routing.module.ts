import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPermissionsComponent } from './login-permissions/login-permissions.component';
import { ReviewPOComponent } from './review-po/review-po.component';


const routes: Routes = [{ path: 'LoginPermissions', component: LoginPermissionsComponent }, { path: 'ReviewPO', component: ReviewPOComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
