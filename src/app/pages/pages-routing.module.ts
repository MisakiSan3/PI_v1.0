import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { PagesComponent } from './pages.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { EventsComponent } from './events/events.component';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {path:"pages", component: PagesComponent,
   children:[
    {path: "teacher-list", component: TeachersComponent},
    {path:'teacher-register', component: RegisterTeacherComponent},
    {path:'events-list', component:EventsComponent},
    {path:'subjects', component:MaterialComponent}
      ]}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
