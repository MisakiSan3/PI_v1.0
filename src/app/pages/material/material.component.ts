import { Component } from '@angular/core';
import { CreateSubjectModel, SubjectModel, UpdateSubjectModel } from 'src/app/models/subject-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
interface Materia {
  nombre: string;
  codigo: string;
}

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  constructor(private subjectService:SubjectService) {
  }
  materia: CreateSubjectModel = {
    user: '01d74dff-5e1d-49f4-acec-6d357a2f3cab',
    nombre_a: ''
  }
  ngOnInit(): void {
    this.getSubjects();
  }
  materias: SubjectModel[] = [
  ]
  getSubjects(){
    this.subjectService.getAll().subscribe(
      response =>{
        this.materias = response;
      }
    )
  }
  vaciar(){
    this.updatedSubject.nombre_a = '';
    this.materia.nombre_a = '';
  }
  createSubjects(){
    this.subjectService.store(this.materia).subscribe(
      response => {
        console.log(response);
        this.materias.push(response);

      }
    )
  }

  updatedSubject: UpdateSubjectModel = {
    id: '',
    nombre_a: '',
    user: '',
  };

  update() {
    this.subjectService.update(this.updatedSubject.id, this.updatedSubject)
      .subscribe(
        (updatedSubject: SubjectModel) => {
          this.getSubjects()
        },
      );
  }
  deleteSubject(id: string) {
    this.subjectService.destroy(id)
      .subscribe(
        (updatedSubject: SubjectModel) => {
          this.getSubjects()
        },
      );
  }

  selectSubject(subject: SubjectModel) {
    this.updatedSubject.id = subject.id;
    this.updatedSubject.nombre_a = subject.nombre_a;
    this.updatedSubject.user = subject.user.id;
    this.updating = true;
  }

  updating: boolean = false;
}
