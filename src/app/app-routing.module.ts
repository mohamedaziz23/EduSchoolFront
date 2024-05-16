import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { ListClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/list-classe/list-classe.component';
import { AddClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/add-classe/add-classe.component';
import { UpdateClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/update-classe/update-classe.component';
import { ListMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/list-matiere/list-matiere.component';
import { AddMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/add-matiere/add-matiere.component';
import { UpdateMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/update-matiere/update-matiere.component';
import { DetailClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/detail-classe/detail-classe.component';
import { EnseignantClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/enseignantClasse/enseignant-classe/enseignant-classe.component';
import { EmploisTempsComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/emplois-temps/emplois-temps.component';
import { CantineComponent } from './EduSchoolBackOffice/Components/gestionCantine/cantine/cantine.component';
import { MenuComponent } from './EduSchoolBackOffice/Components/gestionCantine/menu/menu.component';
import { GroupUserComponent } from './EduSchoolBackOffice/Components/gestionCantine/group-user/group-user.component';
import { ListSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/list-salle/list-salle.component';
import { AddSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/add-salle/add-salle.component';
import { UpdateSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/update-salle/update-salle.component';
import { AffecterEnseignantComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/enseignantClasse/affecter-enseignant/affecter-enseignant.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard",component:DashboardComponent,children:
  [
    // gestion classe
    {path:"classe",component:ListClasseComponent},
    {path:"addClasse",component:AddClasseComponent},
    {path:"update-classe",component:UpdateClasseComponent},
    {path:"detail-classe",component:DetailClasseComponent},
    {path:"enseignant-classe",component:EnseignantClasseComponent},
    {path:"affecter_enseignant",component:AffecterEnseignantComponent},
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





  ]},
  {path:"DashboardEnseignant",component:DashboardEnseignantComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
