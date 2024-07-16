import { TeacherModel } from "./teacher-model.entity";

export class EventsPluginModel {
    id: string = '';
    title: string = '';
    start: string = '';
    end: string = '';
    description: string = '';
    maestro: TeacherModel = {
        id: "",
        teacherName: "",
        teacherLastName: "",
        phoneNumber: "",
        email: "",
        subject: {
            id: "",
            subjectName: "",
            user: {
                id: 0,
                email: "",
                password: "",
                nickname: ""
            }
        }
    }

}