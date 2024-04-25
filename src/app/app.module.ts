import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './EduSchoolBackOffice/Components/dashboard/dashboard.component';
import { HomePageComponent } from './EduSchoolFrontOffice/Components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { MatFormFieldModule } from '@angular/material/form-field';
import { GestionExamenComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionExamen/gestion-examen/gestion-examen.component';
import { GestionCalendrierExamenComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionExamen/gestion-calendrier-examen/gestion-calendrier-examen.component';
import { HomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/homework/homework.component';
import { GestionHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/gestion-homework.component';
import { ResultatComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionResultat/resultat/resultat.component';
import { GestionResultatComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionResultat/gestion-resultat/gestion-resultat.component';
import { ExamenComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionExamen/examen/examen.component';
import { CalendrierExamenComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionExamen/calendrier-examen/calendrier-examen.component';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ListHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/list-homework/list-homework.component';
import { UpdateHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/update-homework/update-homework.component';
import { ViewHomeworkComponent } from './EduSchoolBackOffice/Components/GestionPedagogique/GestionHomeWork/gestion-homework/view-homework/view-homework.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomePageComponent,
    ExamenComponent,
    CalendrierExamenComponent,
    GestionExamenComponent,
    GestionCalendrierExamenComponent,
    HomeworkComponent,
    GestionHomeworkComponent,
    ResultatComponent,
    GestionResultatComponent,
    ListHomeworkComponent,
    UpdateHomeworkComponent,
    ViewHomeworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatNativeDateModule,
    MatInputModule ,
    MatFormFieldModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
