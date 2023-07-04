import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponentComponent } from './calendar-component.component';
import { EventsFormComponent } from './events-form/events-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:"calendar",canActivate:[AuthGuard], component: CalendarComponentComponent,
   children:[
    {path: "",component: CalendarComponent},
    {path: 'register-event',canActivate:[AuthGuard], component: EventsFormComponent}
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
