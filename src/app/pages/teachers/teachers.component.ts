import { Component } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {

  maestros = [
    {
      nombre: 'Jorge',
      apellido: 'Marco',
      asignatura: {
        nombre: 'Matemática'
      },
      correo: 'jorge@gmail.com',
      telf: '098765432'
    },
    {
      nombre: 'Jorge',
      apellido: 'Marco',
      asignatura: {
        nombre: 'Matemática'
      },
      correo: 'jorge@gmail.com',
      telf: '098765432'
    },
    {
      nombre: 'Jorge',
      apellido: 'Marco',
      asignatura: {
        nombre: 'Matemática'
      },
      correo: 'jorge@gmail.com',
      telf: '098765432'
    },
    {
      nombre: 'Jorge',
      apellido: 'Marco',
      asignatura: {
        nombre: 'Matemática'
      },
      correo: 'jorge@gmail.com',
      telf: '098765432'
    }
  ]

  printI(i: any){
    
    const div = document.getElementById(i) as HTMLElement
    const div2 = document.getElementById(i + i) as HTMLElement
    console.log(div2);
  }
}
