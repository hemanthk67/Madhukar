import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/Auth",
    pathMatch: "full"
  },
  {
    path: "Auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "Internal",
    loadChildren: () =>
      import("./internal-view/internal/internal.module").then(
        m => m.InternalModule
      )
  },
  {
    path: "Tender",
    loadChildren: () =>
      import("./internal-view/tender/tender.module").then(m => m.TenderModule),
    outlet: "approved"
  },
  {
    path: "Production",
    loadChildren: () =>
      import("./internal-view/production/production.module").then(
        m => m.ProductionModule
      ),
    outlet: "approved"
  },
  {
    path: "Marketing",
    loadChildren: () =>
      import("./internal-view/marketing/marketing.module").then(
        m => m.MarketingModule
      ),
    outlet: "approved"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
