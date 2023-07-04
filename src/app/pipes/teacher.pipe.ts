import { Pipe, PipeTransform } from '@angular/core';
import { TeacherModel } from '../models/teacher-model.entity';

@Pipe({
  name: 'teacher'
})
export class TeacherPipe implements PipeTransform {

  transform(value: TeacherModel[], query: string): TeacherModel[] {
    if(query === '' || query === undefined) {
      return value;
    }
     value = value.filter(maestro => maestro.nombre_p.toLowerCase().indexOf(query.toLowerCase()) != -1 ||maestro.apellido_p.toLowerCase().indexOf(query.toLowerCase()) != -1)
     return value
  }

}

@Pipe({
  name: 'teacherAsignaturaPipe'
})
export class TeacherAsignaturaPipe implements PipeTransform {
  events: TeacherModel[]= []
  transform(value: TeacherModel[], query: string): TeacherModel[] {
    if(query === '' || query === undefined || !query) {
      return value;
    }
    value = value.filter(maestro => maestro.asignatura.nombre_a.toLowerCase().indexOf(query.toLowerCase()) != -1)
    return value;
  }

}