export interface UserModel {
    id: number;
    email: string;
    password: string;
    nickname: string;
}

export interface CreateUserModel extends  Omit<UserModel, 'id'>{
}

export interface UpdateUserModel extends Omit<UserModel,'id'>{
    id: string;
}
  