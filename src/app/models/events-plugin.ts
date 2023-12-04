import { TeacherModel } from "./teacher-model.entity";

export class EventsPluginModel {
    id: string = '';
    title: string = '';
    start: string = '';
    end: string = '';
    description: string = '';
    maestro: TeacherModel = {
        id: "",
        name_p: "",
        lastname_p: "",
        telf: "",
        email: "",
        subject: {
            id: "",
            name_s: "",
            user: {
                id: 0,
                email: "",
                password: "",
                nickname: ""
            }
        }
    }

}