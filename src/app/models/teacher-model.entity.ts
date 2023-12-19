import { SubjectModel } from "./subject-model.entity";

export interface TeacherModel {
    id : string;
    name_p : string;
    lastname_p : string;
    telf : string;
    email : string;
    subject: SubjectModel;

}
export interface CreateTeacherModel extends  Omit<TeacherModel, 'id' >{
    subject: SubjectModel;
}

export interface UpdateTeacherModel extends Omit<TeacherModel, 'subject'>{
    id: string;
    subject: string;
}
