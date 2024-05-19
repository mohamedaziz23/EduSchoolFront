import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import {LeaveRequestComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-request/leave-request.component";
import {LeaveTypeComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-type/leave-type.component";
import {LeaveListComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-list/leave-list.component";
import {MyRequestLeaveComponent} from "./EduSchoolBackOffice/Components/gestionPresence/my-request-leave/my-request-leave.component";
import {LeaveTypeListComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-type-list/leave-type-list.component";
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {
  DashboardEnseignantComponent
} from "./EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component";
import {
  DashboardEleveComponent
} from "./EduSchoolBackOffice/Components/Dashboards/dashboard-eleve/dashboard-eleve.component";
import { ListClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/list-classe/list-classe.component';
import { AddClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/add-classe/add-classe.component';
import { UpdateClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/update-classe/update-classe.component';
import { ListMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/list-matiere/list-matiere.component';
import { AddMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/add-matiere/add-matiere.component';
import { UpdateMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/update-matiere/update-matiere.component';
import { DetailClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/detail-classe/detail-classe.component';
import { EnseignantClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/enseignant-classe/enseignant-classe.component';
import { EmploisTempsComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/emplois-temps/emplois-temps.component';
import { CantineComponent } from './EduSchoolBackOffice/Components/gestionCantine/cantine/cantine.component';
import { MenuComponent } from './EduSchoolBackOffice/Components/gestionCantine/menu/menu.component';
import { GroupUserComponent } from './EduSchoolBackOffice/Components/gestionCantine/group-user/group-user.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard-enseignant",component:DashboardEnseignantComponent,children:
    [
      {path:"Request-leave",component: LeaveRequestComponent},
      {path:"My-request",component:MyRequestLeaveComponent}
    ]
  },
  {path:"Dashboard-eleve",component:DashboardEleveComponent},

  {path:"Dashboard",component:DashboardComponent,children:
      [
        {path:"Leave-type" , component:LeaveTypeComponent},
        {path:"Leave-list",component:LeaveListComponent},
        {path:"Leave-type-list",component:LeaveTypeListComponent},


    // gestion classe
    {path:"classe",component:ListClasseComponent},
    {path:"addClasse",component:AddClasseComponent},
    {path:"update-classe",component:UpdateClasseComponent},
    {path:"detail-classe",component:DetailClasseComponent},
    {path:"enseignant-classe",component:EnseignantClasseComponent},
    {path:"emplois-temps",component:EmploisTempsComponent},


    // gestion matiere
    {path:"matiere",component:ListMatiereComponent},
    {path:"addMatiere",component:AddMatiereComponent},
    {path:"update-matiere",component:UpdateMatiereComponent},


    // gestion cantine
    {path:"cantine",component:CantineComponent},
    {path:"repas",component:MenuComponent},
    {path:"groupe-cantine",component:GroupUserComponent},







    ]
  },
  {path:"Leave-type/:id",component:LeaveTypeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
