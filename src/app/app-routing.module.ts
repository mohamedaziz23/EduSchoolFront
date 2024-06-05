import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import {LeaveRequestComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-request/leave-request.component";
import {LeaveTypeComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-type/leave-type.component";
import {LeaveListComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-list/leave-list.component";
import {MyRequestLeaveComponent} from "./EduSchoolBackOffice/Components/gestionPresence/my-request-leave/my-request-leave.component";
import {LeaveTypeListComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-type-list/leave-type-list.component";
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import { DashboardEleveComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard-eleve/dashboard-eleve.component";


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
import { ListSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/list-salle/list-salle.component';
import { AddSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/add-salle/add-salle.component';
import { UpdateSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/update-salle/update-salle.component';
import { EleveClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/eleve-classe/eleve-classe.component';
import {AddAbsenceComponent} from "./EduSchoolBackOffice/Components/gestionPresence/add-absence/add-absence.component";
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './EduSchoolBackOffice/Components/Dashboards/user-list/user-list.component';
import { GereRdvComponent } from './EduSchoolBackOffice/Components/RDV/gere-rdv/gere-rdv.component';
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { MenuUserComponent } from './EduSchoolBackOffice/Components/gestionCantine/menu-user/menu-user.component';
import { ReclamationService } from './EduSchoolBackOffice/Components/services/reclamationService/reclamation.service';
import { GestionReclamationComponent } from './EduSchoolBackOffice/Components/gestion-reclamation/gestion-reclamation.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard-enseignant",component:DashboardEnseignantComponent,children:
    [
      {path:"Request-leave",component: LeaveRequestComponent},
      {path:"My-request",component:MyRequestLeaveComponent},
       {path:"user_menu",component:MenuUserComponent},

    ]
  },
  {path:"Dashboard-eleve",component:DashboardEleveComponent,children:[
    {path:"emplois-temps",component:EmploisTempsComponent},
    {path:"enseignant-classe",component:EnseignantClasseComponent},
    {path:"user_menu",component:MenuUserComponent},
    {path:"user_reclamation",component:GestionReclamationComponent},


  ]},

  {path:"Dashboard",component:DashboardComponent,children:
      [
        {path:"Leave-type" , component:LeaveTypeComponent},
        {path:"Leave-list",component:LeaveListComponent},
        {path:"Leave-type-list",component:LeaveTypeListComponent},
        {path:"Add-Absence",component: AddAbsenceComponent},


    // gestion classe
    {path:"classe",component:ListClasseComponent},
    {path:"addClasse",component:AddClasseComponent},
    {path:"update-classe",component:UpdateClasseComponent},
    {path:"detail-classe",component:DetailClasseComponent},

    // gestion enseignant classe
    {path:"enseignant-classe",component:EnseignantClasseComponent},

    // gestion eleve classe
    {path:"eleve-classe",component:EleveClasseComponent},
   // {path:"affecter_enseignant",component:AffecterEnseignantComponent},


    {path:"emplois-temps",component:EmploisTempsComponent},




    // gestion matiere
    {path:"matiere",component:ListMatiereComponent},
    {path:"addMatiere",component:AddMatiereComponent},
    {path:"update-matiere",component:UpdateMatiereComponent},


    // gestion cantine
    {path:"cantine",component:CantineComponent},
    {path:"repas",component:MenuComponent},
    {path:"groupe-cantine",component:GroupUserComponent},

    // gestion salle
    {path:"salle",component:ListSalleComponent},
    {path:"add-salle",component:AddSalleComponent},
    {path:"update-salle",component:UpdateSalleComponent},

    // gestion RDV

    { path: 'rdv', component: GereRdvComponent },

    // gestion reclamation
    {path:"user_reclamation",component:GestionReclamationComponent},


  ]},

  {path:"Login",component:LoginComponent},
  {path:"listuser",component:UserListComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
