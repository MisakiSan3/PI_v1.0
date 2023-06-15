import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRoutingModule } from './calendar/calendar-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {path:'', redirectTo: 'calendar',pathMatch: 'full'},
  {path:'teacher', loadChildren:()=> import('./pages/pages.module').then(m => m.PagesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CalendarRoutingModule,PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
