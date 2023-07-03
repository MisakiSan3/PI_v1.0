import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event-model.entity';
import { EventService } from 'src/app/services/events.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(private eventsService: EventService, private router: Router, private tokenService: TokenService){}

  ngOnInit(): void {
    this.getEvents()
  }
  startDate: string[]= []
  endDate: string[]= []
  timeStart: string[] = []
  timeEnd: string[] = []
  events: EventModel[]= [];
  getEvents(){
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
    this.eventsService.getEventsByUserId(userId).subscribe(
       response =>{
          response.forEach(element => {
            if (element.categoria.nombre_c != 'Clase') {
              this.events.push(element)
            }
          });    
          this.prepareEvents()     
      }
    )
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
  deleteEvent(id: string){
    this.eventsService.destroy(id).subscribe(
      response =>{
      }
    )
  }
}
