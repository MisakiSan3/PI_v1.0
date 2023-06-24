import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsFormComponent } from './events-form/events-form.component';
import { CalendarComponentComponent } from './calendar-component.component';
import { SharedModule } from '../shared/shared.module';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalendarComponent,
    EventsFormComponent,
    CalendarComponentComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FullCalendarModule,
    NgSelectModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CalendarComponent,
    EventsFormComponent,
    CalendarComponentComponent
  ]
})
export class CalendarModule { }
