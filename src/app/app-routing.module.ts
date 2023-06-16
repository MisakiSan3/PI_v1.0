import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRoutingModule } from './calendar/calendar-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { SliderComponent } from './shared/slider/slider.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';

const routes: Routes = [
  {path:'', redirectTo: 'pages',pathMatch: 'full'},
  { path: 'slider', component: SliderComponent },
  { path: 'calendar', component: CalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CalendarRoutingModule,PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
