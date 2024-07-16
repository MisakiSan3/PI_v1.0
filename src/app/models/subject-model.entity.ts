import { AssitModel } from "./assit-model.entity";
import { UserModel } from "./user-model.entity";

export interface SubjectModel {
    id: string;
    subjectName: string;
    user: UserModel;

}

export interface CreateSubjectModel extends  Omit<SubjectModel,'id'>{

}

export interface UpdateSubjectModel extends Omit<SubjectModel, 'user'>{
    id: string;
    user: AssitModel
}
