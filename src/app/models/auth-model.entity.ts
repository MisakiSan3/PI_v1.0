export class UserAuthModel {
    email: string;
    password: string;

    constructor(email: string, contrasenia: string) {
        this.email = email;
        this.password = contrasenia;
    }
}