import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event-model.entity';
import { SubjectModel } from 'src/app/models/subject-model.entity';
import { EventService } from 'src/app/services/events.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(private eventsService: EventService, private router: Router, private tokenService: TokenService,private subjectService: SubjectService){}

  ngOnInit(): void {
    this.getEvents();
    this.getSubjectsF();
  }
  filterName: string = '';
  filterAsignatura: string = '';
  startDate: string[]= []
  materias: SubjectModel[]= []
  endDate: string[]= []
  timeStart: string[] = []
  timeEnd: string[] = []
  events: EventModel[]= [];
  async getEvents(){
    this.events = []
    this.events = await this.eventsService.getEventListByUser();
    console.log(this.events);
    
    this.prepareEvents();
  }
  prepareEvents(){
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i]
      this.startDate[i] = event.start.toString().slice(0,10)
      this.endDate[i] = event.end.toString().slice(0,10)
      this.timeStart[i] = event.start.toString().slice(11,16)
      this.timeEnd[i] = event.end.toString().slice(11,16)
    }
  }
  deleteEvent(event: EventModel){

    this.eventsService.deleteevent(event)
    this.getEvents()
  }
  /*getSubjects(){
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
      this.subjectService.getAll().subscribe(
        response => {
          this.materias = response;
        },
        (error) => {
          console.error('Error al obtener las asignaturas:', error);
        }
      );
  }*/

  //Get de materias Firebase
 async getSubjectsF(){
    this.materias = await this.subjectService.getSubjectListByUser();
  }

}
