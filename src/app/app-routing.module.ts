import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRoutingModule } from './calendar/calendar-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModuleModule } from './auth/auth-routing.module.module';
import { NoFoundPagesComponent } from './no-found-pages/no-found-pages.component';

const routes: Routes = [
  {path:'', redirectTo: 'login',pathMatch: 'full'},
  {path:'**', component: NoFoundPagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CalendarRoutingModule,PagesRoutingModule, AuthRoutingModuleModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
