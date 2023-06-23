import { Component,OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventModel } from 'src/app/models/event-model.entity';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { EventService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  constructor(private eventsService: EventService,private router: Router){}
  events: EventModel[] = [];
  visible: boolean = false;
  event: EventModel = {
    id: '',
    title: '',
    start: new Date,
    end: new Date,
    description: '',
    maestro: {
      id: '',
      nombre_p: '',
      apellido_p: '',
      telf: '',
      email: '',
      asignatura: {
        id: '',
        nombre_a: '',
        user: {
          id: '',
          nombre_u: '',
          apellido_u: '',
          telf: '',
          email: '',
          contrasenia: '',
          nickname: ''
        }
      }
    },
    categoria: {
      id: '',
      nombre_c: ''
    }
  }
  ngOnInit(): void {
   this.getEvents();
  }
  deleteEvents(){
    sessionStorage.clear();
  }
  getEvents(){
    for (let i = 0; i < sessionStorage.length; i++) {
      const sesionJson = sessionStorage.getItem(i.toString());
      if (sesionJson) {
        const event = JSON.parse(sesionJson);
        this.events.push(event)
      }else {
        console.log('no hay');
      }
     }
  }
    
  calendarOptions:CalendarOptions = {
      plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    eventClick: this.handleDateClick.bind(this),
    initialDate: new Date,
    lazyFetching: false,
    events: this.events,
    weekends: false,
  }
  
  handleDateClick(arg: EventClickArg) {
    const eventArg = arg.event._def
    if (this.event.id === eventArg.publicId && this.visible) {
      this.visible = false;
    }else{
      this.visible = true;
    }
    this.event.title = eventArg.title;
    this.event.id = eventArg.publicId;
    this.event.description = eventArg.extendedProps['description'];
    this.event.categoria = eventArg.extendedProps['categoria'];
    this.event.maestro = eventArg.extendedProps['maestro'];
  }
  
  deleteEvent(){
    this.eventsService.destroy(this.event.id).subscribe(
      response =>{
        console.log(response);
      }
    )
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].id === this.event.id) {
        sessionStorage.removeItem(i.toString());
      }  
    }
    window.location.reload();
  }
  
  
  

  
}
