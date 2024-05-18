import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { GereRdvComponent } from './EduSchoolBackOffice/Components/RDV/gere-rdv/gere-rdv.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"DashboardEnseignant",component:DashboardEnseignantComponent},
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      { path: 'rdv', component: GereRdvComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
