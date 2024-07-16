import { AssitModel } from "./assit-model.entity";
import { SubjectModel } from "./subject-model.entity";

export interface TeacherModel {
    id : string;
    teacherName : string;
    teacherLastName : string;
    phoneNumber : string;
    email : string;
    subject: SubjectModel;

}
export interface CreateTeacherModel extends  Omit<TeacherModel, 'id' >{
    subject: SubjectModel;
}

export interface UpdateTeacherModel extends Omit<TeacherModel, 'subject'>{
    id: string;
    subject: AssitModel;
}
