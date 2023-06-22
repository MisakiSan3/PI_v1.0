import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { MaterialComponent } from './material/material.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {path:"pages", component: PagesComponent,
   children:[
    {path: "", component: DashboardComponent},
    {path: "teacher-list", component: TeachersComponent},
    {path: "teacher-register", component: RegisterTeacherComponent},
    {path: "subjects", component: MaterialComponent},
    {path: "event-list", component: EventsComponent}
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
