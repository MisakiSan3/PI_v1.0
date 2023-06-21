import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialComponent } from './material/material.component';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [PagesComponent, TeachersComponent, RegisterTeacherComponent, MaterialComponent, EventsComponent,DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    NgSelectModule
  ]
})
export class PagesModule { }
