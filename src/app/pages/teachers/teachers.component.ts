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
  }
  maestros: TeacherModel[] = []
  materias: SubjectModel[] = []
  getTeachers(){
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
    this.teachersService.getTeachersByUserId(userId).subscribe(
      response =>{
        this.maestros = response;

      }
    )
  }
  deleteTeachers(id: string){
    this.teachersService.destroy(id).subscribe(response => {
      this.getTeachers()
    })
  }

  getSubjects(){
    const userId: string | null =  this.tokenService.getUserIdFromToken() ?? '';
      this.subjectService.getSubjectsByUserId(userId).subscribe(
        (materias:SubjectModel[]) => {
          this.materias = materias;
        },
        (error) => {
          console.error('Error al obtener las asignaturas:', error);
        }
      );
  }
  
}
