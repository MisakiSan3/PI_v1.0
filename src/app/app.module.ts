import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { EventsFormComponent } from './calendar/events-form/events-form.component';
import { SharedModule } from './shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModuleModule } from './auth/auth-routing.module.module';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventsFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FullCalendarModule,
    AuthRoutingModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
