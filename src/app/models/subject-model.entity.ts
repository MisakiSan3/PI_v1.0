import { UserModel } from "./user-model.entity";

export interface SubjectModel {
    id: string;
    nombre_a: string;
    user: UserModel;

}

export interface CreateSubjectModel extends  Omit<SubjectModel, 'id' |'user'>{
    user: string;
}

export interface UpdateSubjectModel extends Partial<SubjectModel>{
    id: string;
    userId?: string;
}