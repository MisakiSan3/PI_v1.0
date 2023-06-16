import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRoutingModule } from './calendar/calendar-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  {path:'', redirectTo: 'calendar',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CalendarRoutingModule,PagesRoutingModule, AuthRoutingModuleModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
