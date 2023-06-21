import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  TeacherModel,
  CreateTeacherModel,
  UpdateTeacherModel
} from '../models/teacher-model.entity';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  
  readonly API_URL: string = "http://localhost:5000/user";

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<TeacherModel[]> {
    const url = `${this.API_URL}`; 
    return this.httpClient.get<TeacherModel[]>(url);
    //obejeto.metodo
  }
  getOne(id: TeacherModel['id']):Observable<TeacherModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<TeacherModel>(url);
  }
  store(teacher: CreateTeacherModel):Observable<TeacherModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}`; 
    return this.httpClient.post<TeacherModel>(url, teacher)
  }

  update(id: TeacherModel['id'], teacher: UpdateTeacherModel):Observable<TeacherModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<TeacherModel>(url, teacher);//devuelve un observable de tipo TeacherModel
  }
  destroy(id: TeacherModel['id']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)   
      return response.rta;
      })
      );
  }
}