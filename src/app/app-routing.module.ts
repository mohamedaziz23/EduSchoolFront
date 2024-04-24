import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import {LeaveRequestComponent} from "./EduSchoolBackOffice/Components/leave-request/leave-request.component";
import {LeaveTypeComponent} from "./EduSchoolBackOffice/Components/leave-type/leave-type.component";
import {LeaveListComponent} from "./EduSchoolBackOffice/Components/leave-list/leave-list.component";
import {MyRequestLeaveComponent} from "./EduSchoolBackOffice/Components/my-request-leave/my-request-leave.component";
import {LeaveTypeListComponent} from "./EduSchoolBackOffice/Components/leave-type-list/leave-type-list.component";

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
