import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  TeacherModel,
  CreateTeacherModel,
  UpdateTeacherModel
} from '../models/teacher-model.entity';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  readonly API_URL: string = "http://localhost:8093/api/teacher/";

  constructor(private httpClient: HttpClient,private tokenService: TokenService) { }
  httpOptions={
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    }),
  }


  getAll():Observable<TeacherModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<TeacherModel[]>(url,this.httpOptions);
    //obejeto.metodo
  }
  getTeachersByUserId(userId: string): Observable<TeacherModel[]> {
    const url = `${this.API_URL}/teacher/${userId}`;
    return this.httpClient.get<TeacherModel[]>(url);
  }
  getOne(id: TeacherModel['id']):Observable<TeacherModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<TeacherModel>(url,this.httpOptions);
  }
  store(teacher: CreateTeacherModel):Observable<TeacherModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}save`;
    console.log(teacher);

    return this.httpClient.post<TeacherModel>(url, teacher,this.httpOptions)
  }

  update(id: TeacherModel['id'], teacher: UpdateTeacherModel):Observable<TeacherModel> {
    const url = `${this.API_URL}save`;
    return this.httpClient.post<TeacherModel>(url, teacher,this.httpOptions);//devuelve un observable de tipo TeacherModel
  }
  destroy(id: TeacherModel['id']):Observable<any> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.delete<any>(url,this.httpOptions).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }
}
