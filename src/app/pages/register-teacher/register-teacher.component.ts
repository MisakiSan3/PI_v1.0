import { Component, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/models/subject-model.entity';
import { CreateTeacherModel, TeacherModel } from 'src/app/models/teacher-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {
  constructor(private subjectService:SubjectService,private teacherService:TeacherService) {
  }
  teacher: CreateTeacherModel = {
    asignatura: '',
    nombre_p: '',
    apellido_p: '',
    telf: '',
    email: ''
  }
  materias: SubjectModel[] = []
  ngOnInit(): void {
    this.getSubjects();
  }
  getSubjects(){
    this.subjectService.getAll().subscribe(
      response =>{
        this.materias = response;
      }
    )
  }

  createTeacher(){
    console.log(this.teacher);
    try {
         this.teacherService.store(this.teacher).subscribe(
          response =>{
            console.log(response);
          }
        )
    } catch (error) {
      console.log(error)
    }
   
  }

}
