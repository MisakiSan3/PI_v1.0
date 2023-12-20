import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectModel } from 'src/app/models/subject-model.entity';
import { CreateTeacherModel, TeacherModel, UpdateTeacherModel } from 'src/app/models/teacher-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  teacher: CreateTeacherModel = {
    subject:{
      id: '',
      name_s: "",
      user: {
        email: "",
        id: 0,
        username: "",
        password: ""
      }
    },
    name_p: '',
    lastname_p: '',
    telf: '',
    email: ''
  };
  materias: SubjectModel[] = [];
  updating = false;
  teacherEdit: UpdateTeacherModel = {
    id: '',
    name_p: '',
    lastname_p: '',
    telf: '',
    email: '',
    subject:{
      id:"0"}
  };

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getSubjects();
    if (history.state.id) {
      this.updating = true;
      this.teacherEdit.id = history.state.id;
      this.teacherEdit.name_p = history.state.nombre_p;
      this.teacherEdit.lastname_p = history.state.apellido_p;
      this.teacherEdit.telf = history.state.telf;
      this.teacherEdit.email = history.state.email;
      this.teacherEdit.subject = history.state.asignatura.id;
      console.log(this.teacherEdit);
    }
  }

  initializeForm(): void {
    this.teacherForm = this.formBuilder.group({
      nombre_p: ['', Validators.required],
      apellido_p: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      telf: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      asignatura: [null, Validators.required]
    });
  }

  getSubjects(): void {
    const userId: string | null = this.tokenService.getUserIdFromToken() ?? '';
    this.subjectService.getAll().subscribe(
      (materias: SubjectModel[]) => {
        this.materias = materias;
        console.log(materias);

      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  createTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    this.teacherService.store(this.teacher).subscribe(
      (response) => {
        if (response) {
          this.router.navigateByUrl('pages/teacher-list');
        }
      },
      (error) => {
        console.error('Error al registrar el profesor:', error);
      }
    );
  }

  updateTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const teacherId = this.teacherEdit.id;
    this.teacherService.update(teacherId, this.teacherEdit).subscribe(
      (response) => {
        if (response) {
          this.router.navigateByUrl('pages/teacher-list');
        }
      },
      (error) => {
        console.error('Error al actualizar el profesor:', error);
      }
    );
  }
}
