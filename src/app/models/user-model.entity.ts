export interface UserModel {
    id: string;
    nombre_u: string;
    apellido_u: string;
    telf: string;
    email: string;
    contrasenia: string;
    nickname: string;
}

export interface CreateUserModel extends  Omit<UserModel, 'id'>{
}

export interface UpdateUserModel extends Partial<UserModel>{
    id: string;
}
  