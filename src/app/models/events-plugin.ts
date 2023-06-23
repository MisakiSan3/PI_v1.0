import { TeacherModel } from "./teacher-model.entity";

export class EventsPluginModel {
    id: string = '';
    title: string = '';
    start: string = '';
    end: string = '';
    description: string = '';
    maestro: TeacherModel = {
        id: "",
        nombre_p: "",
        apellido_p: "",
        telf: "",
        email: "",
        asignatura: {
            id: "",
            nombre_a: "",
            user: {
                id: "",
                nombre_u: "",
                apellido_u: "",
                telf: "",
                email: "",
                contrasenia: "",
                nickname: ""
            }
        }
    }

}