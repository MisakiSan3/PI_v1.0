import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { CreateEventModel, EventModel, UpdateEventModel } from 'src/app/models/event-model.entity';
import { TeacherModel } from 'src/app/models/teacher-model.entity';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/events.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  constructor(private categoryService:CategoryService,
    private teacherService:TeacherService,
    private eventService:EventService,
    private router: Router,
    private tokenService: TokenService
    ) {
  }
  ngOnInit(): void {
    this.updatingVerification()
    this.getTeachers();
    this.getCategories();
  }
  categorias: CategoryModel[] = [];
  esClase: boolean = false;
  events: EventModel[] = [];
  maestros: TeacherModel[] = [];
  updating: boolean = false;
  timeStart: Time = {
    hours: 0,
    minutes: 0
  };
  timeEnd: Time = {
    hours: 0,
    minutes: 0
  };
  event: CreateEventModel = {
    title: '',
    start: '',
    end: '',
    description: '',
    maestro: '',
    categoria: ''
  };
  eventUpdate: UpdateEventModel = {
    id: '',
    title: '',
    start: '',
    end: '',
    description: '',
    maestro: '',
    categoria: ''
  };

  getCategories(){
    this.categoryService.getAll().subscribe(
      response =>{
        this.categorias = response;
        console.log(this.categorias);
        
      }
    )
  }
  getTeachers(){
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
    this.teacherService.getTeachersByUserId(userId).subscribe(
      response =>{
        this.maestros = response;

      }
    )
  }
  categoryHandler(){
    let auxClase = false
    this.categorias.forEach(categoria => {
      if (this.event.categoria === categoria.id) {
        if (categoria.nombre_c === 'Clase') {
          auxClase = true;
        }
      }else {
        this.esClase = false
      }
      if (auxClase) {
        this.esClase = true
      }
    });
  }
  
  createEvent(){
    if (this.esClase) {
      this.event.end = this.event.start + 'T' + this.timeEnd + '-05:00';
      this.event.start = this.event.start + 'T' + this.timeStart + '-05:00';
    } else {
      this.event.end = this.event.end + 'T' + this.timeEnd + '-05:00';
    }
    console.log(this.event);
    this.postEvent()
  }

  postEvent(){
    try {
      this.eventService.store(this.event).subscribe(
        responseStore => {
          this.deleteEvents()
              this.getEvents()
              window.location.href = '/calendar'
        }
      )
    } catch (error) {
      console.log(error);
    }
  }
  createUpdate(){
    if (this.esClase) {
      this.eventUpdate.end = this.eventUpdate.start + 'T' + this.timeEnd + '-05:00';
      this.eventUpdate.start = this.eventUpdate.start + 'T' + this.timeStart + '-05:00';
    } else {
      this.eventUpdate.start = this.eventUpdate.start + 'T' + this.timeStart + '-05:00';
      this.eventUpdate.end = this.eventUpdate.end + 'T' + this.timeEnd + '-05:00';
    }
    this.updateEvent()
  }
  updateEvent(){
    console.log(this.eventUpdate);
    try {
      this.eventService.update(this.eventUpdate.id,this.eventUpdate).subscribe(
        responseUpdate => {
          this.deleteEvents()
          this.getEvents()
          window.location.href = '/calendar'
        }
      )
    } catch (error) {
      console.log(error);
    }
  }
  deleteEvents(){
    sessionStorage.clear();
  }
  updatingVerification(){
    if (history.state.id) {
      if (typeof history.state === typeof this.event) {
        this.prepareEventUpdate()
        this.updating = true;
      }
    } else {
      this.updating = false;
    }
  }
  prepareEventUpdate(){
    const hist = history.state
    const startDate = hist.start.slice(0,10)
    const endDate = hist.end.slice(0,10)
    this.timeStart = hist.start.slice(11,16)
    this.timeEnd = hist.end.slice(11,16)
    this.eventUpdate.maestro = hist.maestro.id
    this.eventUpdate.categoria = hist.categoria.id
    this.eventUpdate.title = hist.title
    this.eventUpdate.description = hist.description
    this.eventUpdate.id = hist.id
    this.eventUpdate.start = startDate
    this.eventUpdate.end = endDate 
  }
  getEvents(){
    this.eventService.getAll().subscribe(
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
