import { Component,OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event-model.entity';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private eventsService: EventService){}
  events: EventModel[] = [];
  ngOnInit(): void {
  this.getEvents();
  }
  getEvents(){
    this.eventsService.getAll().subscribe(
       response =>{
         this.events = response;
         var counter = 0;
         this.events.forEach(element => {
          if(!sessionStorage.getItem(counter.toString())){
            const json = JSON.stringify(element)
            sessionStorage.setItem(counter.toString(),json)
          }
          counter++
         });
      }
    )
  }
}
