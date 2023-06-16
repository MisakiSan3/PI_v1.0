import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRoutingModule } from './calendar/calendar-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';
import { NoFoundPagesComponent } from './no-found-pages/no-found-pages.component';
import { AuthRoutingModuleModule } from './auth/auth-routing.module.module';

const routes: Routes = [
  {path:'', redirectTo: 'calendar',pathMatch: 'full'},
  {path:'pages', loadChildren:()=> import('./pages/pages.module').then(m => m.PagesModule)},
  {path:'**', component: NoFoundPagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CalendarRoutingModule,PagesRoutingModule, AuthRoutingModuleModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
