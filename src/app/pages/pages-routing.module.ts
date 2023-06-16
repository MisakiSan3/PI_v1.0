import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { PagesComponent } from './pages.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {path:"pages", component: PagesComponent,
   children:[
    {path: "", component: TeachersComponent},
    {path:'register', component: RegisterTeacherComponent},
    {path:'materias', component: MaterialComponent},
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
