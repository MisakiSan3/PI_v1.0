import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateSubjectModel, SubjectModel, UpdateSubjectModel } from 'src/app/models/subject-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TokenService } from 'src/app/services/token.service';
import { AsyncPipe } from '@angular/common';
import { documentId } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materiaForm!: FormGroup;
  materias: SubjectModel[] = [];
  updating = false;
  updatedSubject: UpdateSubjectModel = {
    id: '',
    name_s: '',
    user: {
      id: '0',
    },
    
  };
  modalRef?: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private tokenService: TokenService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getSubjectsF();
    this.subjectService.getSubjectListByUser();
    
  }

  initializeForm(): void {
    this.materiaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    });
  }

  getSubjects(): void {
    const userId: string | null = this.tokenService.getUserIdFromToken() ?? '';
    this.subjectService.getAll().subscribe(
      (materias: SubjectModel[]) => {
        this.materias = materias;
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  nombreInvalido(): boolean {
    const nombreField = this.materiaForm.get('nombre');
    return nombreField?.invalid ?? false;
  }

  vaciar(): void {
    this.materiaForm.reset();
    this.updating = false;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  createSubjects(successTemplate: TemplateRef<any>, errorTemplate: TemplateRef<any>): void {
    if (this.materiaForm.invalid) {
      this.openModal(errorTemplate);
      this.materiaForm.markAllAsTouched();
      return;
    }

    const newSubject: CreateSubjectModel = {
      name_s: this.materiaForm.get('nombre')?.value,
      user: {
        id: "",
        username: '',
        email: '',
        password: ''
      },
    };

    this.subjectService.store(newSubject).subscribe(
      response => {
        this.materias.push(response);
        this.materiaForm.reset();
        this.openModal(successTemplate);
      },
      error => {
        console.error('Error al crear la materia:', error);
      }
    );
  }

  update(): void {
    if (this.materiaForm.invalid) {
      this.materiaForm.markAllAsTouched();
      return;
    }

    this.updatedSubject.name_s = this.materiaForm.get('nombre')?.value;

    this.subjectService.update(this.updatedSubject.id, this.updatedSubject).subscribe(
      response => {
        this.getSubjects();
        this.materiaForm.reset();
        this.updating = false;
      },
      error => {
        console.error('Error al actualizar la materia:', error);
      }
    );
  }

  deleteSubject(id: string): void {
    this.subjectService.destroy(id).subscribe(
      updatedSubject => {
        this.getSubjects();
      },
      error => {
        console.error('Error al eliminar la materia:', error);
      }
    );
  }

  selectSubject(subject: SubjectModel): void {
    this.updatedSubject.id = subject.id;
    this.updatedSubject.name_s = subject.name_s;
    this.updatedSubject.user.id = subject.user.id.toString();
    this.updating = true;
  }

  //Firebase create
    async createSubjectsF(){
    if (this.materiaForm.invalid) {
      this.materiaForm.markAllAsTouched();
      return;
    }

    const newSubjects: CreateSubjectModel = {
      name_s: this.materiaForm.get('nombre')?.value,
      user: {
        id: "0",
        username: "",
        email: "",
        password: ""
      },
    };
    const response = await this.subjectService.savesubject(newSubjects);
    console.log(response)

  }
  //Firebase get 
   async getSubjectsF(){
    this.materias = await this.subjectService.getSubjectListByUser();
  }
  //firebase delete

  async deleteSubjectF(materia:SubjectModel){
    const response = await this.subjectService.deletesubject(materia)
    console.log(response)

  }

  //firebase actualizar
  updateSubjectF(){
    this.subjectService.updatesubject(this.updatedSubject)
    
  }
  
}
