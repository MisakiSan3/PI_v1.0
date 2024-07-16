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
  eventbd: EventModel[] = [];
  visible: boolean = false;
  event: EventModel = {
    id: '',
    title: '',
    start: new Date,
    end: new Date,
    description: '',
    teacher: {
      id: '',
      teacherName: '',
      teacherLastName: '',
      phoneNumber: '',
      email: '',
      subject: {
        id: '',
        subjectName: '',
        user: {
          id: "",
          email: '',
          password: '',
          username: ''
        }
      }
    },
    eventCategory: {
      id: '',
      categoryName: ''
    }
  }
  startDate: string = '';
  endDate: string = '';
  ngOnInit(): void {
   this.getEventsF();
   /*this.getEvents2F();*/
  }
  deleteEvents(){
    sessionStorage.clear();
  }

  calendarOptions:CalendarOptions = {
      plugins: [dayGridPlugin],
      timeZone: 'local',
    initialView: 'dayGridWeek',
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
    this.event.eventCategory = eventArg.extendedProps['eventCategory'];
    this.event.teacher = eventArg.extendedProps['teacher'];
    this.events.forEach(event => {
      if (event.id == this.event.id) {
 
       this.startDate = event.start.toLocaleString().slice(11,16);
       this.endDate = event.end.toLocaleString().slice(11,16);
       this.event.start = event.start,
       this.event.end = event.end
      }
    });

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

  async getEventsF(){
    this.events = await this.eventsService.getClassListByUser()
      this.calendarOptions.events = this.events
    
  }
  /*async getEvents2F(){
    this.events = await this.eventsService.getEventListByUser();
    this.calendarOptions.events = this.events

  }*/

  async deleteEventsF(events: EventModel){
    const response = await this.eventsService.deleteevent(events);
    window.location.href = '/calendar'

  }



}
