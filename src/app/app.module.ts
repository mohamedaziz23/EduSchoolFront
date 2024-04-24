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
import { LeaveRequestComponent } from './EduSchoolBackOffice/Components/leave-request/leave-request.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LeaveTypeComponent } from './EduSchoolBackOffice/Components/leave-type/leave-type.component';
import { LeaveListComponent } from './EduSchoolBackOffice/Components/leave-list/leave-list.component';
import { MyRequestLeaveComponent } from './EduSchoolBackOffice/Components/my-request-leave/my-request-leave.component';
import { LeaveTypeListComponent } from './EduSchoolBackOffice/Components/leave-type-list/leave-type-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomePageComponent,
    LeaveRequestComponent,
    LeaveTypeComponent,
    LeaveListComponent,
    MyRequestLeaveComponent,
    LeaveTypeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
