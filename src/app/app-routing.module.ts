import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEleveComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-eleve/dashboard-eleve.component';

import { ListClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/list-classe/list-classe.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './EduSchoolBackOffice/Components/Dashboards/user-list/user-list.component';
import { AuthGuard } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { RegisteradminComponent } from './registeradmin/registeradmin.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard",component:DashboardComponent,children:
  [
    {path:"class",component:ListClasseComponent}

  ]},
  {path:"DashboardEnseignant",component:DashboardEnseignantComponent},
  {path:"DashboardStudent",component:DashboardEleveComponent},

  {path:"Login",component:LoginComponent},
  {path:"listuser",component:UserListComponent},
  {path:"register",component:RegisterComponent},
  {path:"registeradmin",component:RegisteradminComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{initialNavigation:'enabledBlocking'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
