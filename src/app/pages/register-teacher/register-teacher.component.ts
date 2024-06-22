import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectModel } from 'src/app/models/subject-model.entity';
import { CreateTeacherModel, TeacherModel, UpdateTeacherModel } from 'src/app/models/teacher-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  teacher: TeacherModel= {
    subject: {
      id: "",
      name_s: "",
      user: {
        email: "",
        id: "",
        username: "",
        password: ""
      }
    },
    name_p: '',
    lastname_p: '',
    telf: '',
    email: '',
    id: ''
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
      id: "0"
    }
  };

  modalRef: BsModalRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    
    if (history.state.id) {
      this.updating = true;
    console.log(history.state);

      this.teacher.id = history.state.id;
      this.teacher.name_p = history.state.name_p;
      this.teacher.lastname_p = history.state.lastname_p;
      this.teacher.telf = history.state.telf;
      this.teacher.email = history.state.email;
      this.teacher.subject = history.state.subject
      console.log(this.teacher);
    }
    //get Subjects Firebase
    this.getSubjectsF()
    
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

  /*getSubjects(): void {
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
  }*/

  /*createTeacher(template: TemplateRef<any>): void {
    if (this.teacherForm.invalid) {
      this.openModal(template);
      return;
    }

    window.location.href = '/pages/teacher-list';
    this.teacherService.store(this.teacher).subscribe(
      (response) => {
        if (response) {
          this.openSuccessModal(template);
        }
      },
      (error) => {
        console.error('Error al registrar el profesor:', error);
      }
    );
  }*/

  updateTeacher(template: TemplateRef<any>): void {
    if (this.teacherForm.invalid) {
      this.openModal(template);
      return;
    }

  
    this.teacherService.updateteacher(this.teacher);
    this.router.navigate(['pages/teacher-list']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openSuccessModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    setTimeout(() => {
      this.modalRef?.hide();
    }, 2000); // Cierra automáticamente el modal después de 2 segundos
  }
  //obtener  materias para teacher Firebase 
  async getSubjectsF(){
    this.materias = await this.subjectService.getSubjectListByUser()
  }
  //crear teacher Firebase 
  async createTeacherF() {
    /*const Newteacher: CreateTeacherModel ={
      email: this.teacherForm.get("email")?.value,
      name_p: this.teacherForm.get("nombre_p")?.value,
      lastname_p: this.teacherForm.get("apellido_p")?.value,
      telf: this.teacherForm.get("telf")?.value,
      subject: {
        id: "",
        name_s: "",
        user: {
          email: "",
          id: "",
          username: "",
          password: ""
        }
      },
    }*/
    const response = await this.teacherService.saveteacher(this.teacher);
    this.router.navigate(['pages/teacher-list']);
    
  }

}
