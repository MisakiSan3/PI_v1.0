import { TeacherModel } from "./teacher-model.entity";

export interface EventModel {
    id: string;
    nombre_a: string;
    fecha_i: Date;
    fecha_f: Date;
    descripcion: string;
    maestro: TeacherModel;
    categoria: string;

}
export interface CreateEventModel extends  Omit<EventModel, 'id' |'categoria'>{
    categoriaId: string;
}

export interface UpdateEventModel extends Partial<EventModel>{
    id: string;
    categoriaId?: string;
}