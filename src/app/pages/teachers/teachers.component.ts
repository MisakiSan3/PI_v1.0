import { Component, OnInit } from '@angular/core';
import { TeacherModel } from 'src/app/models/teacher-model.entity';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  constructor(private teachersService:TeacherService) {
  }
  ngOnInit(): void {
    this.getTeachers();
  }
  maestros: TeacherModel[] = [
  ]
  getTeachers(){
    this.teachersService.getAll().subscribe(
      response =>{
        this.maestros = response;

      }
    )
  }

  
}
