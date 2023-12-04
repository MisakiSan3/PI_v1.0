import { UserModel } from "./user-model.entity";

export interface SubjectModel {
    id: string;
    name_s: string;
    user: UserModel;

}

export interface CreateSubjectModel extends  Omit<SubjectModel, 'id'>{
    
}

export interface UpdateSubjectModel extends Partial<SubjectModel>{
    id: string;
}
