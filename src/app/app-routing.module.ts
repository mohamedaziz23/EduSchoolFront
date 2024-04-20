import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard",component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
