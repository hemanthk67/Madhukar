import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPermissionsComponent } from './login-permissions/login-permissions.component';


const routes: Routes = [{ path: 'LoginPermissions', component: LoginPermissionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
