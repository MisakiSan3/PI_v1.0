import { Component } from '@angular/core';
import { CreateSubjectModel, SubjectModel, UpdateSubjectModel } from 'src/app/models/subject-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TokenService } from 'src/app/services/token.service';
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

  id:string | null = null;
  constructor(private subjectService:SubjectService, private tokenService:TokenService) {
    
  }
  
  materia: CreateSubjectModel = {
    user: '',
    nombre_a: ''
  }

  ngOnInit(): void {
    this.getSubjects();
    // Obtener el ID del usuario desde el token
    
  
   
  }
  
  materias: SubjectModel[] = []
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
  vaciar(){
    this.updatedSubject.nombre_a = '';
    this.materia.nombre_a = '';
  }
  createSubjects(){
    this.subjectService.store(this.materia).subscribe(
      response => {
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
    console.log(subject);
    
    this.updatedSubject.id = subject.id;
    this.updatedSubject.nombre_a = subject.nombre_a;
    this.updatedSubject.user = subject.user.id;
    this.updating = true;
  }

  

  
  

  updating: boolean = false;
}
