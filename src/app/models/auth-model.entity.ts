export class UserAuthModel {
  username: string;
    password: string;

    constructor(username: string, contrasenia: string) {
        this.username =username;
        this.password = contrasenia;
    }
}
