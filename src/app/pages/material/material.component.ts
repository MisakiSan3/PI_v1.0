import { Component } from '@angular/core';
import { CreateSubjectModel, SubjectModel } from 'src/app/models/subject-model.entity';
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

}
