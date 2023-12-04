import { Pipe, PipeTransform } from '@angular/core';
import { EventModel } from '../models/event-model.entity';

@Pipe({
  name: 'eventPipe'
})
export class EventPipePipe implements PipeTransform {
  events: EventModel[]= []
  transform(value: EventModel[], query: string): EventModel[] {
    if(query === '' || query === undefined) {
      return value;
    }
    value = value.filter(event => event.title.toLowerCase().indexOf(query.toLowerCase()) != -1 ||event.description.toLowerCase().indexOf(query.toLowerCase()) != -1)
    return value;
  }

}

@Pipe({
  name: 'eventAsignaturaPipe'
})
export class EventAsignaturaPipe implements PipeTransform {
  events: EventModel[]= []
  transform(value: EventModel[], query: string): EventModel[] {
    if(query === '' || query === undefined || !query) {
      return value;
    }
    value = value.filter(event => event.teacher.subject.name_s.toLowerCase().indexOf(query.toLowerCase()) != -1)
    return value;
  }

}
