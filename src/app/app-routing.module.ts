import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRoutingModule } from './calendar/calendar-routing.module';

const routes: Routes = [
  {path:'', redirectTo: 'calendar',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CalendarRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
