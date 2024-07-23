
import { SubjectModel } from "./subject-model.entity";
import { TeacherModel } from "./teacher-model.entity";


export interface RecordModel {
    id: string;
    subject: SubjectModel;
    sections: {grades: number[], sectionGrade: number, percentage: number,showResults: boolean}[],
    finalGrade: number

}

export interface CreateRecordModel extends  Omit<RecordModel,'id'>{

}
