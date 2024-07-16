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
     value = value.filter(maestro => maestro.name_p.toLowerCase().indexOf(query.toLowerCase()) != -1 ||maestro.name_p.toLowerCase().indexOf(query.toLowerCase()) != -1)
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
    value = value.filter(maestro => maestro.subject.subjectName.toLowerCase().indexOf(query.toLowerCase()) != -1)
    return value;
  }

}