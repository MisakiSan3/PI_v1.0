import { SubjectModel } from "./subject-model.entity";

export interface TeacherModel {
    id : string;
    nombre_p : string;
    apellido_p : string;
    telf : string;  
    email : string;
    asignatura: SubjectModel;

}
export interface CreateTeacherModel extends  Omit<TeacherModel, 'id' |'asignatura'>{
    asignatura: string;
}

export interface UpdateTeacherModel extends Omit<TeacherModel, 'asignatura'>{
    id: string;
    asignatura: string;
}