import { Component, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/models/subject-model.entity';
import { CreateTeacherModel, TeacherModel } from 'src/app/models/teacher-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { UpdateTeacherModel } from '../../models/teacher-model.entity';
import { TokenService } from 'src/app/services/token.service';
import { router } from 'ngx-bootstrap-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {
  constructor(private subjectService:SubjectService,private teacherService:TeacherService, private tokenService: TokenService,private router: Router) {
  }
  teacher: CreateTeacherModel = {
    asignatura: '',
    nombre_p: '',
    apellido_p: '',
    telf: '',
    email: ''
  }
  materias: SubjectModel[] = []
  updating= false
  update: boolean = false
  teachers: TeacherModel[] = []
  TeachersModel: any;
  ngOnInit(): void {
    this.getSubjects();
    if (history.state.id) {
        this.updating = true
        
        this.teacherEdit.id = history.state.id
        this.teacherEdit.nombre_p = history.state.nombre_p
        this.teacherEdit.apellido_p = history.state.apellido_p
        this.teacherEdit.telf = history.state.telf
        this.teacherEdit.email = history.state.email
        this.teacherEdit.asignatura = history.state.asignatura.id

        console.log(this.teacherEdit)
      }
  }

  teacherEdit: TeacherModel = {
    id : '',
    nombre_p: '',
    apellido_p: '',
    telf:'',
    email: '',
    asignatura: {
      id: '',
      nombre_a: '',
      user: {
        id: '',
        nombre_u: '',
        apellido_u: '',
        telf: '',
        email: '',
        contrasenia: '',
        nickname: ''
      }
    }
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

  createTeacher(){
    console.log(this.teacher);
    try {
         this.teacherService.store(this.teacher).subscribe(
          response =>{
            if (response) {
              this.router.navigateByUrl('pages/teacher-list')
            }
          }
        )
    } catch (error) {
      console.log(error)
    }

  }

  updateTeacher( ) {
    console.log(this.teacherEdit)
    console.log('update')
    const response = this.teacherService.
    update(this.teacherEdit.id, this.teacherEdit)
      .subscribe((response)=>{
        if (response) {
          this.router.navigateByUrl('pages/teacher-list')
        }
      });
  }

}
