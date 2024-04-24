import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import {LeaveRequestComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-request/leave-request.component";
import {LeaveTypeComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-type/leave-type.component";
import {LeaveListComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-list/leave-list.component";
import {MyRequestLeaveComponent} from "./EduSchoolBackOffice/Components/gestionPresence/my-request-leave/my-request-leave.component";
import {LeaveTypeListComponent} from "./EduSchoolBackOffice/Components/gestionPresence/leave-type-list/leave-type-list.component";
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"Dashboard",component:DashboardComponent,children:
      [
        {path:"Request-Leave",component:LeaveRequestComponent},
        {path:"Leave-type" , component:LeaveTypeComponent},
        {path:"Leave-list",component:LeaveListComponent},
        {path:"My-request",component:MyRequestLeaveComponent},
        {path:"Leave-type-list",component:LeaveTypeListComponent},



    ]
  },
  {path:"Leave-type/:id",component:LeaveTypeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
