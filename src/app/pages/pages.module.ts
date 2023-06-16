import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialComponent } from './material/material.component';



@NgModule({
  declarations: [PagesComponent, TeachersComponent, RegisterTeacherComponent, MaterialComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
