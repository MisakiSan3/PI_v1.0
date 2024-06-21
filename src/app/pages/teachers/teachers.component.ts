import { Component, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/models/subject-model.entity';
import { TeacherModel } from 'src/app/models/teacher-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  constructor(private teachersService:TeacherService, private tokenService: TokenService, private subjectService: SubjectService) {
  }
  ngOnInit(): void {
    this.getTeachers();
    this.getSubjectsF();
    this.getTeachersF();
  }
  maestros: TeacherModel[] = []
  materias: SubjectModel[] = []
  filterName: string = '';
  filterAsignatura: string = '';
  getTeachers(){
    //const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
    this.teachersService.getAll().subscribe(
      response =>{
        this.maestros = response;

      }
    )
  }
  deleteTeachers(id: string){
    window.location.href = '/pages/teacher-list'
    this.teachersService.destroy(id).subscribe(response => {
      this.getTeachers()
    })
  }

  getSubjects(){
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
      this.subjectService.getAll().subscribe(
        (materias:SubjectModel[]) => {
          this.materias = materias;
        },
        (error) => {
          console.error('Error al obtener las asignaturas:', error);
        }
      );
  }
  //obtener materias Firebase
  getSubjectsF(){
    this.subjectService.getsubjectList().subscribe(
      (materias: SubjectModel[])=>
      {this.materias =materias;
        console.log(materias)
      })
  }
  // obtener Teachers firebase
  getTeachersF(){
    this.teachersService.getteacherList().subscribe(
      response =>{
        this.maestros = response;
  
      }
    )
    
  }

  //Eliminar teachers firebase

  async deleteTeacherF(teacher: TeacherModel){
    const response =await this.teachersService.deleteteacher(teacher)

  }

}
