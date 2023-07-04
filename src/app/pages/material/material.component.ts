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
      nombre_a: '',
      user: '',
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
        nombre: ['', Validators.required]
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

    nombreInvalido(): boolean {
      const nombreField = this.materiaForm.get('nombre');
      return nombreField?.invalid ?? false;
    }


    vaciar(): void {
      this.updatedSubject.nombre_a = '';
      this.updating = false;
    }

    createSubjects(): void {
      if (this.materiaForm.invalid) {
        this.materiaForm.markAllAsTouched();
        return;
      }

      const newSubject: CreateSubjectModel = {
        user: '',
        nombre_a: this.materiaForm.get('nombre')?.value
      };

      this.subjectService.store(newSubject).subscribe(
        response => {
          this.materias.push(response);
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

      this.subjectService.update(this.updatedSubject.id, this.updatedSubject).subscribe(
        response => {
          this.getSubjects();
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
      this.updatedSubject.nombre_a = subject.nombre_a;
      this.updatedSubject.user = subject.user.id;
      this.updating = true;
    }
  }
