import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import { GestionHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/gestion-homework.component';
import { ListHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/list-homework/list-homework.component';
import { UpdateHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/update-homework/update-homework.component';
import { AjouterNoteComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionResultat/ajouter-note/ajouter-note.component';
import { ListeResultatComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionResultat/liste-resultat/liste-resultat.component';
import { ModifierNoteComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionResultat/modifier-note/modifier-note.component';
import { AjouterExamenComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionExamen/ajouter-examen/ajouter-examen.component';
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';

const routes: Routes = [
  { path: "", component: HomePageComponent }, 
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      { path: 'GestionHomeWork', component: GestionHomeworkComponent },
      { path: 'ListHomework', component: ListHomeworkComponent },
      { path: 'UpdateHomework/:id', component: UpdateHomeworkComponent },
      { path: 'AjouterNote', component: AjouterNoteComponent },
      { path: 'AjouterExamen', component: AjouterExamenComponent },
      { path: 'ListNote', component: ListeResultatComponent },
      { path: 'ModifierNote/:id', component: ModifierNoteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
