import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  SubjectModel,
  CreateSubjectModel,
  UpdateSubjectModel
} from '../models/subject-model.entity';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  
  readonly API_URL: string = "http://localhost:8093/api/subject/";

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService

    
    ) { }

  getAll():Observable<SubjectModel[]> {
    const url = `${this.API_URL}`; 
    return this.httpClient.get<SubjectModel[]>(url);
    //obejeto.metodo
  }


  getOne(id: SubjectModel['id']):Observable<SubjectModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<SubjectModel>(url);
  }

  //-------------------------------------------------

  store(subject: CreateSubjectModel):Observable<SubjectModel> {
    const url = `${this.API_URL}save`; 
   /* const userId = this.tokenService.getUserIdFromToken();
    if (userId) {
      subject.user = userId;
      return this.httpClient.post<SubjectModel>(url, subject)
    }*/
    subject.user={
      "id": 1,
      "username": "Misaki",
      "email": "misakisan380@gmail.com",
      "password": "12345678"
    }
    return this.httpClient.post<SubjectModel>(url, subject)
    throw new Error('No se pudo obtener el ID de usuario del token.');
  }

  update(id: SubjectModel['id'], subject: UpdateSubjectModel):Observable<SubjectModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.patch<SubjectModel>(url, subject);//devuelve un observable de tipo SubjectModel
  }
  destroy(id: SubjectModel['id']):Observable<any> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)   
      return response.rta;
      })
      );
  }

  //Traer materias segun el ID de Usuario
  getSubjectsByUserId(userId: string): Observable<SubjectModel[]> {
    const url = `${this.API_URL}/user/${userId}`;
    return this.httpClient.get<SubjectModel[]>(url);
  }
}