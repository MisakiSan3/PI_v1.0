import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { MaterialComponent } from './material/material.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:"pages",canActivate:[AuthGuard], component: PagesComponent,
   children:[
    {path: "", component: DashboardComponent},
    {path: "teacher-list", canActivate:[AuthGuard], component: TeachersComponent},
    {path: "teacher-register", canActivate:[AuthGuard], component: RegisterTeacherComponent},
    {path: "subjects", canActivate:[AuthGuard], component: MaterialComponent},
    {path: "event-list", canActivate:[AuthGuard], component: EventsComponent}
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
