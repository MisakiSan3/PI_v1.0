import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    private tokenService: TokenService,
    private teachersService:TeacherService,
    ) {
  }
  ngOnInit(): void {
    this.updatingVerification()
    this.getTeachersF();
    this.getCategories();
  }
  categorias: CategoryModel[] = [];
  esClase: boolean = false;
  events: EventModel[] = [];
  maestros: TeacherModel[] = [];
  updating: boolean = false;
  dateError: boolean = false;
  timeError: boolean = false;
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
    eventCategory: {
      id: "0",
      categoryName: ''
    },
    teacher:{
      id: "0",
      teacherName: '',
      teacherLastName: '',
      phoneNumber: '',
      email: '',
      subject: {
        id: '',
        subjectName: '',
        user: {
          id: '',
          username: '',
          email: '',
          password: ''
        }
      }
    }
  };
  eventUpdate: UpdateEventModel = {
    id: '',
    title: '',
    start: '',
    end: '',
    description: '',
    teacher: {
      id: "0"
    },
    eventCategory: {
      id: "0"
    }
  };

  getCategories(){
    
    this.categoryService.getcategoryList().subscribe(
      response =>{
        
        this.categorias = response;
        this.categoryHandler()
      }
    )
  }
  getTeachers(){
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
    this.teacherService.getAll().subscribe(
      response =>{
        console.log(response);
        
        this.maestros = response;

      }
    )
  }
  categoryHandler(){
    let auxClase = false
    this.categorias.forEach(categoria => {
      if (this.event.eventCategory.id === categoria.id) {
        if (categoria.categoryName === 'Clase') {
          auxClase = true;
        }
      }else {
        this.esClase = false
      }
    });
    if (auxClase) {
      this.esClase = true
    }

  }
  dateHandler(){
    if (this.event.start > this.event.end) {
      this.dateError = true
    }else {
      const errorDiv = document.getElementById('errorDiv') as HTMLElement
      errorDiv.innerHTML = ''
      this.dateError = false
    }
  }
  timeHandler(){
    if (this.timeStart >= this.timeEnd) {
      this.timeError = true
    }else {
      const errorDiv = document.getElementById('errorDiv') as HTMLElement
      errorDiv.innerHTML = ''
      this.timeError = false
    }
  }

  createEvent(){
    if (this.esClase) {
      this.event.end = this.event.start + 'T' + this.timeEnd + '-05:00';
      this.event.start = this.event.start + 'T' + this.timeStart + '-05:00';
    } else {
      this.event.end = this.event.end + 'T' + this.timeEnd + '-05:00';
      this.event.start = this.event.start + 'T' + this.timeStart + '-05:00';
    }
    if (!this.timeError && !this.dateError) {
      this.postEvent()
    }else {
      const errorDiv = document.getElementById('errorDiv') as HTMLElement
      errorDiv.innerHTML = 'La fecha o la hora son incorrectas'
    }
  }

  postEvent(){
    try {
      this.eventService.saveevent(this.event);
      
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
    if (!this.timeError && !this.dateError) {
      this.updateEventsF()
    }else {
      const errorDiv = document.getElementById('errorDiv') as HTMLElement
      errorDiv.innerHTML = 'La fecha o la hora son incorrectas'
    }
  }
  updateEvent(){
    try {
      this.eventService.update(this.eventUpdate.id,this.eventUpdate).subscribe(
        responseUpdate => {
          if (!this.esClase) {
            this.router.navigate(['../pages/event-list'])
          }else{
            this.deleteEvents()
            this.getEvents()
            window.location.href = '/pages'
          }
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
    this.eventUpdate.teacher = hist.teacher
    this.eventUpdate.eventCategory = hist.eventCategory
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
          if (element.eventCategory.categoryName === "Clase") {
            if(!sessionStorage.getItem(counter.toString())){
              const json = JSON.stringify(element)
              sessionStorage.setItem(counter.toString(),json)
              counter++
            }

          }
          counter++
         });
      }
    )
  }
  nombre = new FormControl('', [Validators.required, Validators.pattern(/\D+/),Validators.maxLength(30)])
  descripcion = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  categoria = new FormControl('', [Validators.required]);
  maestro = new FormControl('', [Validators.required]);
  dateInit = new FormControl('', [Validators.required]);
  dateEn = new FormControl('', [Validators.required]);
  timeInit = new FormControl('', [Validators.required]);
  timeEn = new FormControl('', [Validators.required]);

  //get maestros
  async getTeachersF(){
     this.maestros = await this.teachersService.getTeacherListByUser()
  }

  async updateEventsF(){
    try {
      await this.eventService.updateevent(this.eventUpdate);
      window.location.href = '/calendar'
    } catch (error) {
      console.error('Error actualizando la materia', error);
    }
  }

  

}
