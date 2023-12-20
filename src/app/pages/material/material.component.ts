import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateSubjectModel, SubjectModel, UpdateSubjectModel } from 'src/app/models/subject-model.entity';
import { SubjectService } from 'src/app/services/subject.service';
import { TokenService } from 'src/app/services/token.service';

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
      id:"0",
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getSubjects();
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
        console.log(materias);
        
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  nombreInvalido(): boolean {
    const nombreField = this.materiaForm.get('nombre');
    console.log(nombreField?.invalid);

    return nombreField?.invalid ?? false;
  }

  vaciar(): void {
    this.materiaForm.reset();
    this.updating = false;
  }

  createSubjects(): void {
    if (this.materiaForm.invalid) {
      this.materiaForm.markAllAsTouched();
      return;
    }

    const newSubject: CreateSubjectModel = {
      name_s: this.materiaForm.get('nombre')?.value,
      user: {
        id: 0,
        username: "",
        email: "",
        password: ""
      },
    };
    window.location.reload();
    this.subjectService.store(newSubject).subscribe(
      response => {
        this.materias.push(response); 
        this.materiaForm.reset();
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
    window.location.reload();
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
    this.nombreInvalido()
    this.updating = true;
  }


  images: string[] = [
    'URL_IMAGEN_1',
    'URL_IMAGEN_2',
    'URL_IMAGEN_3',
    // Agrega más URLs de imágenes según sea necesario
  ];

  openCalendar() {
    // Lógica para abrir el calendario
    console.log('Abrir calendario');
  }
}
