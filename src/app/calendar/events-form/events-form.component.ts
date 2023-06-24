import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { CreateEventModel, EventModel } from 'src/app/models/event-model.entity';
import { TeacherModel } from 'src/app/models/teacher-model.entity';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/events.service';
import { TeacherService } from 'src/app/services/teacher.service';


@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  constructor(private categoryService:CategoryService,private teacherService:TeacherService,private eventService:EventService) {
  }
  ngOnInit(): void {
    this.getTeachers();
    this.getCategories();
  }
  categorias: CategoryModel[] = [];
  esClase: boolean = false;
  maestros: TeacherModel[] = [];
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

  getCategories(){
    this.categoryService.getAll().subscribe(
      response =>{
        this.categorias = response;
      }
    )
  }
  getTeachers(){
    this.teacherService.getAll().subscribe(
      response =>{
        this.maestros = response;
      }
    )
  }
  categoryHandler(){
    this.categorias.forEach(categoria => {
      if (this.event.categoria === categoria.id) {
        this.esClase = true;
      }else {
        this.esClase = false
      }
    });
  }
  createEvent(){
    this.event.start = this.event.start + 'T' + this.timeStart + '-05:00';
    if (this.esClase) {
      this.event.end = this.event.start + 'T' + this.timeEnd + '-05:00';
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
          console.log(responseStore);
          this.eventService.getOne(responseStore.id).subscribe(
            responseGetOne => {
              this.eventService.getAll().subscribe(
                responseGetAll => {
                  for (let i = 0; i < responseGetAll.length; i++) {
                    if (responseGetAll[i].id === responseGetOne.id) {
                      const responseJson = JSON.stringify(responseGetAll[i]);
                      if (!sessionStorage.getItem(i.toString())) {
                        sessionStorage.setItem(i.toString(),responseJson)
                      }  
                    }
                  }
                }
              )
            }
          )
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

}
