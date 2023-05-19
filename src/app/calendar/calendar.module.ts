import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsFormComponent } from './events-form/events-form.component';



@NgModule({
  declarations: [
    CalendarComponent,
    EventsFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalendarModule { }
