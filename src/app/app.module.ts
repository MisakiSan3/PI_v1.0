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
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { CookieService } from 'ngx-cookie-service';
import { EventPipePipe } from './pipes/event-pipe.pipe';
import { TeacherPipe } from './pipes/teacher.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    PagesModule,
    AuthModule,
    AppRoutingModule,
    AuthRoutingModuleModule,
    NgbModule,
   

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
