import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component';
import { HomePageComponent } from './EduSchoolFrontOffice/Components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEleveComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-eleve/dashboard-eleve.component';
import { ListClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/list-classe/list-classe.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './EduSchoolBackOffice/Tools/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { AddClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/add-classe/add-classe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/update-classe/update-classe.component';
import { ListMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/list-matiere/list-matiere.component';
import { AddMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/add-matiere/add-matiere.component';
import { UpdateMatiereComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/matiere/update-matiere/update-matiere.component';
import { DetailClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/detail-classe/detail-classe.component';
import { EnseignantClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/enseignantClasse/enseignant-classe/enseignant-classe.component';
import { EmploisTempsComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/emplois-temps/emplois-temps.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { CantineComponent } from './EduSchoolBackOffice/Components/gestionCantine/cantine/cantine.component';
import { MenuComponent } from './EduSchoolBackOffice/Components/gestionCantine/menu/menu.component';
import { GroupUserComponent } from './EduSchoolBackOffice/Components/gestionCantine/group-user/group-user.component';
import { DatePipe } from '@angular/common';
import { ListSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/list-salle/list-salle.component';
import { AddSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/add-salle/add-salle.component';
import { UpdateSalleComponent } from './EduSchoolBackOffice/Components/gestionSalle/update-salle/update-salle.component';
import { AffecterEnseignantComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/enseignantClasse/affecter-enseignant/affecter-enseignant.component';
import { EleveClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/eleveClasse/eleve-classe/eleve-classe.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomePageComponent,
    DashboardEnseignantComponent,
    DashboardEleveComponent,
    ListClasseComponent,
    TableComponent,
    AddClasseComponent,
    UpdateClasseComponent,
    ListMatiereComponent,
    AddMatiereComponent,
    UpdateMatiereComponent,
    DetailClasseComponent,
    EnseignantClasseComponent,
    EmploisTempsComponent,
    CantineComponent,
    MenuComponent,
    GroupUserComponent,
    ListSalleComponent,
    AddSalleComponent,
    UpdateSalleComponent,
    AffecterEnseignantComponent,
    EleveClasseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,






  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
