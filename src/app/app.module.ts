import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './EduSchoolFrontOffice/Components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { LeaveRequestComponent } from './EduSchoolBackOffice/Components/gestionPresence/leave-request/leave-request.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LeaveTypeComponent } from './EduSchoolBackOffice/Components/gestionPresence/leave-type/leave-type.component';
import { LeaveListComponent } from './EduSchoolBackOffice/Components/gestionPresence/leave-list/leave-list.component';
import { MyRequestLeaveComponent } from './EduSchoolBackOffice/Components/gestionPresence/my-request-leave/my-request-leave.component';
import { LeaveTypeListComponent } from './EduSchoolBackOffice/Components/gestionPresence/leave-type-list/leave-type-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEleveComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-eleve/dashboard-eleve.component';
import { ListClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/list-classe/list-classe.component';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomePageComponent,
    LeaveRequestComponent,
    LeaveTypeComponent,
    LeaveListComponent,
    MyRequestLeaveComponent,
    LeaveTypeListComponent,
    DashboardEnseignantComponent,
    DashboardEleveComponent,
    ListClasseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
