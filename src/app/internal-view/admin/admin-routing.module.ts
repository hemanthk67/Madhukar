import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPermissionsComponent } from './login-permissions/login-permissions.component';
import { PoReviewComponent } from './po-review/po-review.component';


const routes: Routes = [{ path: 'LoginPermissions', component: LoginPermissionsComponent }
, { path: 'ReviewPO', component: PoReviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
