import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  SubjectModel,
  CreateSubjectModel,
  UpdateSubjectModel
} from '../models/subject-model.entity';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  
  readonly API_URL: string = "http://localhost:5000/subjects";

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<SubjectModel[]> {
    const url = `${this.API_URL}`; 
    return this.httpClient.get<SubjectModel[]>(url);
    //obejeto.metodo
  }
  getOne(id: SubjectModel['id']):Observable<SubjectModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<SubjectModel>(url);
  }
  store(subject: CreateSubjectModel):Observable<SubjectModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}`; 
    return this.httpClient.post<SubjectModel>(url, subject)
  }

  update(id: SubjectModel['id'], subject: UpdateSubjectModel):Observable<SubjectModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.patch<SubjectModel>(url, subject);//devuelve un observable de tipo SubjectModel
  }
  destroy(id: SubjectModel['id']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)   
      return response.rta;
      })
      );
  }
}