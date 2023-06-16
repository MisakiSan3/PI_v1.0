import { Component } from '@angular/core';
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
  materias: Materia[] = [
    { nombre: 'Matemáticas', codigo: 'MAT01' },
    { nombre: 'Historia', codigo: 'HIS01' },
    { nombre: 'Ciencias', codigo: 'CIE01' }
  ];

  nuevaMateria: Materia = {
    nombre: '',
    codigo: ''
  };

  registrarMateria() {
    this.materias.push(this.nuevaMateria);
    this.nuevaMateria = { nombre: '', codigo: '' };
  }

}
