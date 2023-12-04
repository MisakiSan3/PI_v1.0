import { CategoryModel } from "./category-model.entity";
import { TeacherModel } from "./teacher-model.entity";

export interface EventModel {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    teacher: TeacherModel;
    eventCategory: CategoryModel;

}
export interface CreateEventModel extends  Omit<EventModel, 'id' |'eventCategory' |'teacher' |'start' |'end'>{
    eventCategory: CategoryModel;
    teacher: TeacherModel;
    start: string;
    end: string;
}

export interface UpdateEventModel extends Omit<EventModel, 'eventCategory' |'teacher' |'start' |'end'>{
    eventCategory?: string;
    teacher?: string;
    start?: string;
    end?: string;
}