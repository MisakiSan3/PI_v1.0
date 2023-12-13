export class UserAuthModel {
    username: string;
    password: string;

    constructor(email: string, contrasenia: string) {
        this.username = email;
        this.password = contrasenia;
    }
}