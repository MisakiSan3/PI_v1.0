import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsFormComponent } from './calendar/events-form/events-form.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModuleModule } from './auth/auth-routing.module.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from './calendar/calendar.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    CalendarModule,
    AppRoutingModule,
    AuthRoutingModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
