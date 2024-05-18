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
import { GereRdvComponent } from './EduSchoolBackOffice/Components/RDV/gere-rdv/gere-rdv.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, MatOptionModule, DateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {   MatCardModule } from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomePageComponent,
    DashboardEnseignantComponent,
    DashboardEleveComponent,
    GereRdvComponent
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
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatOptionModule,
    FullCalendarModule,
    CommonModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
