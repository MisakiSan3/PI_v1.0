import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { EventsFormComponent } from './calendar/events-form/events-form.component';

const routes: Routes = [
  {path:'', component: CalendarComponent},
  {path:'events-form',component: EventsFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
