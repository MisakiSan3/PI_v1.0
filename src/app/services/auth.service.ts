import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CreateUserModel, UserModel } from '../models/user-model.entity';
import { UserAuthModel } from '../models/auth-model.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  readonly API_URL: string = "http://localhost:8093/auth/";

  constructor(private  httpclient:HttpClient) { 
  }

  

  login(dto: UserAuthModel):Observable<any>{
    return this.httpclient.post<any>(this.API_URL + 'login',dto);
  }

  register(dto: CreateUserModel):Observable<any>{
    return this.httpclient.post<any>(this.API_URL + 'register', dto);
  }
 
}
