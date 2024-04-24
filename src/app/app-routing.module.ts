import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { ListClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/list-classe/list-classe.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard",component:DashboardComponent,children:
  [
    {path:"class",component:ListClasseComponent}

  ]},
  {path:"DashboardEnseignant",component:DashboardEnseignantComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
