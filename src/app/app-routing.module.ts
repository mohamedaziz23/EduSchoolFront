import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import { GestionHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/gestion-homework.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard",component:DashboardComponent},
  {path:"GestionHomeWork",component:GestionHomeworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
