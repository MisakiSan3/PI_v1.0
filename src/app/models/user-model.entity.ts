export interface UserModel {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface CreateUserModel extends  Omit<UserModel, 'id'>{
}

export interface UpdateUserModel extends Omit<UserModel,'id'>{
    id: string;
}
  