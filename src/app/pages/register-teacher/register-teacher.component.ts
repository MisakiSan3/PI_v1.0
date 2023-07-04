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
    asignatura: '',
    nombre_p: '',
    apellido_p: '',
    telf: '',
    email: ''
  };
  materias: SubjectModel[] = [];
  updating = false;
  teacherEdit: UpdateTeacherModel = {
    id: '',
    nombre_p: '',
    apellido_p: '',
    telf: '',
    email: '',
    asignatura: ''
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
      this.teacherEdit.nombre_p = history.state.nombre_p;
      this.teacherEdit.apellido_p = history.state.apellido_p;
      this.teacherEdit.telf = history.state.telf;
      this.teacherEdit.email = history.state.email;
      this.teacherEdit.asignatura = history.state.asignatura.id;
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
    this.subjectService.getSubjectsByUserId(userId).subscribe(
      (materias: SubjectModel[]) => {
        this.materias = materias;
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
