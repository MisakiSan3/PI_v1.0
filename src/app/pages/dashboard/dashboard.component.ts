import { Component,OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event-model.entity';
import { EventService } from 'src/app/services/events.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //nombreUsuario: string;
  nombreUsuario: string | null = null ;
  idUsuario: string | null = null ;
  events: EventModel[] = [];
  constructor(
    private eventsService: EventService,
    private tokenService: TokenService
    ){
      this.nombreUsuario = this.tokenService.getUserNameFromToken();
    }

  
  
  //events: EventModel[] = [];
  ngOnInit(): void {
  this.getEvents();
  this.tokenService.getUserNameFromToken();
  this.tokenService.getUserIdFromToken();
  }

  getUserNameFromToken() {
    this.nombreUsuario = this.tokenService.getUserNameFromToken();
  }
  getUserIdFromToken() {
    this.idUsuario = this.tokenService.getUserIdFromToken();
  }
  getEvents(){
    sessionStorage.clear()
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
    this.eventsService.getEventsByUserId(userId).subscribe(
       response =>{
         this.events = response;
         var counter = 0;
         this.events.forEach(element => {
          if (element.categoria.nombre_c === "Clase") {
            if(!sessionStorage.getItem(counter.toString())){
              const json = JSON.stringify(element)
              sessionStorage.setItem(counter.toString(),json)
              counter++
            }
            
          }
          
         });
      }
    )
  }
}
