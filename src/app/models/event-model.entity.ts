import { CategoryModel } from "./category-model.entity";
import { TeacherModel } from "./teacher-model.entity";

export interface EventModel {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    maestro: TeacherModel;
    categoria: CategoryModel;

}
export interface CreateEventModel extends  Omit<EventModel, 'id' |'categoria'>{
    categoriaId: string;
}

export interface UpdateEventModel extends Partial<EventModel>{
    id: string;
    categoriaId?: string;
}